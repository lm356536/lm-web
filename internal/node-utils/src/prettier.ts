import fs from 'node:fs/promises';

import { format, getFileInfo, resolveConfig, Options } from 'prettier';

async function prettierFormat(filepath: string) {
  const prettierOptions = await resolveConfig(filepath, {});

  const fileInfo = await getFileInfo(filepath);

  const input = await fs.readFile(filepath, 'utf8');
  const output = await format(input, {
    ...prettierOptions,
    parser: fileInfo.inferredParser as Options['parser'],
  });
  if (output !== input) {
    await fs.writeFile(filepath, output, 'utf8');
  }
  return output;
}

export { prettierFormat };
