/**
 * Studio lighting environment.
 *
 * Built entirely from `Lightformer` panels rendered into a small cube target —
 * no HDRI download, no CDN, no bundled binary. The panels give the sphere its
 * soft, wrapping pearl highlights and the coloured streaks: a broad key
 * overhead, cool spill from the left, magenta from the right, and a whisper of
 * mint underneath. Each panel's colour and intensity comes from the theme.
 */

import { Environment, Lightformer } from '@react-three/drei'

export default function StudioEnvironment({ resolution = 256, env }) {
  return (
    <Environment resolution={resolution} frames={1} background={false}>
      {/* Broad key — the long highlight across the crown. */}
      <Lightformer
        form="rect"
        intensity={env.keyIntensity}
        color={env.key}
        position={[0, 5, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[9, 9, 1]}
      />
      {/* Cool rim, camera left. */}
      <Lightformer
        form="rect"
        intensity={env.leftIntensity}
        color={env.left}
        position={[-5, 1.2, 2]}
        rotation={[0, Math.PI / 2.6, 0]}
        scale={[7, 9, 1]}
      />
      {/* Warm/counter rim, camera right. */}
      <Lightformer
        form="rect"
        intensity={env.rightIntensity}
        color={env.right}
        position={[5, 1.4, 1]}
        rotation={[0, -Math.PI / 2.6, 0]}
        scale={[7, 9, 1]}
      />
      {/* Under-fill so the terminator is not dead black. */}
      <Lightformer
        form="rect"
        intensity={env.underIntensity}
        color={env.under}
        position={[0, -3.4, 3]}
        rotation={[-Math.PI / 2.4, 0, 0]}
        scale={[8, 5, 1]}
      />
      {/* Faint mint kicker — barely visible, adds the green in the film. */}
      <Lightformer
        form="circle"
        intensity={env.mintIntensity}
        color={env.mint}
        position={[2.4, -1.6, 4]}
        scale={[3, 3, 1]}
      />
      {/* Dark shell stops the environment flooding the ground. Omitted in
          light themes, where it would kill the fill entirely. */}
      {env.shell !== false && (
        <mesh scale={60}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshBasicMaterial color={env.shellColor ?? '#000000'} side={1} />
        </mesh>
      )}
    </Environment>
  )
}
