import { IBundleOptions } from 'umi-library/src/types';

const options: IBundleOptions = {
  cjs: 'rollup',
  esm: 'rollup',
  doc: { typescript: true } as any,
};

export default options;
