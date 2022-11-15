import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import glob from 'glob';
import merge from '@alexlafroscia/yaml-merge';

import { writeFileSync } from 'fs';

const buildDocFile = () => {
  const mainPath = path.resolve(__dirname, '../');
  const documentationIndex = path.resolve(__dirname, './index.yaml');
  const mergedDocumentationPath = `${mainPath}/docs/mergedPrehireDocumentation.yaml`;

  const docPathFiles = glob.sync(`${mainPath}/src/**/*-docs.yaml`);

  const filesToMerge = [documentationIndex, ...docPathFiles];
  const joinedContent = merge(...filesToMerge);

  writeFileSync(mergedDocumentationPath, joinedContent);

  return YAML.load(mergedDocumentationPath);
};

const UISetup = () => {
  const swaggerUIOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
  };

  const docFile = buildDocFile();

  const swaggerUiSetup = swaggerUi.setup(docFile, swaggerUIOptions);
  return { swaggerUiSetup, swaggerServe: swaggerUi.serve };
};

module.exports = { UISetup };
