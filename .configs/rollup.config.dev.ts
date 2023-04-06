import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import readPkg from 'read-pkg';
import dts from 'rollup-plugin-dts';
import { swc } from 'rollup-plugin-swc3';

const pkg = readPkg.sync();

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'cjs',
        file: './dist/cjs/index.cjs',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: './dist/esm/index.mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return (
            pkg?.dependencies?.[module] != null &&
            pkg?.devDependencies?.[module] != null &&
            pkg?.peerDependencies?.[module] != null
          );
        },
      }),
      typescript({
        tsconfig: 'tsconfig.prod.json',
        compilerOptions: {
          sourceMap: false,
        },
      }),
      swc(),
    ],
  },
  {
    input: 'dist/esm/src/index.d.ts',
    output: [
      {
        file: 'dist/esm/index.d.ts',
        format: 'esm',
      },
      {
        file: 'dist/cjs/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
];
