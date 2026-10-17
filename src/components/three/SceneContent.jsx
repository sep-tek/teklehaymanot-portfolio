/**
 * Scene graph for the hero.
 *
 * Every colour comes from the active theme's `scene` block, so switching to
 * Pearl or Ocean retunes the lighting and ground tint rather than leaving a
 * black-cinematic scene sitting on a light page. The sphere stays iridescent
 * in every theme — only the light around it changes.
 *
 * Fog is tinted to the theme background so the terrain dissolves seamlessly
 * into the page instead of ending on a hard edge. It is linear with a near
 * plane far enough back that the sphere itself stays completely unfogged.
 */

import { useEffect } from 'react'
import { PerformanceMonitor } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import CameraRig from './CameraRig'
import StudioEnvironment from './StudioEnvironment'
import IridescentSphere from './IridescentSphere'
import RockyGround from './RockyGround'
import { useHeroFraming } from './useHeroFraming'

/**
 * Tone-mapping exposure is seeded once in `onCreated`, but themes differ
 * enough in headroom that it has to be re-applied whenever the theme changes.
 *
 * The WebGLRenderer is intentionally imperative — there is no declarative
 * equivalent for exposure — so this assignment is the sanctioned way to
 * change it. Guarded so it only writes when the value actually differs.
 */
function ExposureSync({ exposure }) {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    if (gl.toneMappingExposure !== exposure) {
      // eslint-disable-next-line react/immutability -- WebGLRenderer is imperative by design; exposure has no declarative equivalent.
      gl.toneMappingExposure = exposure
    }
  }, [gl, exposure])

  return null
}

export default function SceneContent({ settings, theme, interactive, pointerGain = 1, onDecline }) {
  const scene = theme.scene
  const sphereSegments = settings.sphereSegments
  const { dim } = useHeroFraming()

  return (
    <>
      <color attach="background" args={[scene.background]} />
      <fog attach="fog" args={[scene.background, scene.fogNear, scene.fogFar]} />

      <ExposureSync exposure={scene.exposure} />

      {/* Runs before the scene settles its first frame so the sphere is never
          briefly drawn at the wrong scale on a narrow viewport. */}
      <CameraRig />

      <ambientLight intensity={scene.ambient.intensity} color={scene.ambient.color} />

      {/* Key light — also the only shadow caster, so shadows stay cheap. */}
      <directionalLight
        castShadow
        position={[3.4, 8.5, 5.2]}
        intensity={scene.key.intensity}
        color={scene.key.color}
        shadow-mapSize-width={settings.shadowMapSize}
        shadow-mapSize-height={settings.shadowMapSize}
        shadow-bias={-0.0006}
        shadow-radius={4}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />

      {/*
        Rim lights sit BEHIND and to the sides rather than in front. In front
        they just acted as flat fill; from behind they wrap the silhouette and
        give the sphere a readable edge against the black, which is what sells
        the volume. The front of the sphere is left to the key light and the
        environment panels, so the pearl highlight stays clean.
      */}
      <pointLight position={[-5.6, 1.1, -2.4]} intensity={scene.rimLeft.intensity} distance={20} decay={2} color={scene.rimLeft.color} />
      <pointLight position={[5.4, 0.7, -1.8]} intensity={scene.rimRight.intensity} distance={18} decay={2} color={scene.rimRight.color} />

      {/* Cool separation wash from directly behind. */}
      <pointLight position={[0, 1.8, -6]} intensity={scene.back.intensity} distance={22} decay={2} color={scene.back.color} />

      {/* Barely-there frontal fill so the face never goes fully black. */}
      <pointLight position={[0, -0.4, 5.5]} intensity={scene.rimLeft.intensity * 0.22} distance={16} decay={2} color={scene.back.color} />

      {/*
        Keyed on the theme so the cube target is rebuilt when the palette
        changes. `<Environment frames={1}>` renders exactly one frame and then
        stops, so without remounting it the sphere would keep reflecting the
        previous theme's light panels forever.
      */}
      <StudioEnvironment
        key={theme.id}
        resolution={settings.reflections ? 256 : 128}
        env={scene.env}
      />

      <IridescentSphere
        radius={1.28}
        segments={sphereSegments}
        textureSize={settings.textureSize}
        interactive={interactive}
        gain={pointerGain}
        dim={dim}
        look={scene.sphere}
      />

      <RockyGround
        segments={settings.terrainSegments}
        size={settings.terrainSize}
        textureSize={settings.groundTextureSize}
        reflections={settings.reflections}
        reflectorResolution={settings.reflectorResolution}
        look={scene.ground}
      />

      <PerformanceMonitor flipflops={3} onDecline={onDecline} />
    </>
  )
}
