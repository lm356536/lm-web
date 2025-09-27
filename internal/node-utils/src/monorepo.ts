import { dirname } from 'path';
import findUp from 'find-up';

/**
 * 查找大仓的根目录
 * @param cwd
 */
async function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = await findUp('pnpm-lock.yaml', {
    cwd,
    type: 'file',
  });
  return dirname(lockFile || '');
}

/**
 * 获取大仓的所有包
 */
async function getPackages() {
  const root = await findMonorepoRoot();
  const { getPackages: getPackagesFunc } = await import('@manypkg/get-packages');
  return await getPackagesFunc(root);
}

/**
 * 获取大仓指定的包
 */
async function getPackage(pkgName: string) {
  const { packages } = await getPackages();
  return packages.find((pkg) => pkg.packageJson.name === pkgName);
}

export { findMonorepoRoot, getPackage, getPackages };