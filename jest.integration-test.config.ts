import { pathsToModuleNameMapper } from 'ts-jest'
import type { Config } from '@jest/types'
import { compilerOptions } from './tsconfig.json'

const config: { projects: Config.InitialOptions[] } = {
  projects: [
    {
      preset: 'ts-jest',
      setupFilesAfterEnv: ['<rootDir>/test/setupIntegrationTest.ts'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.integration-test.ts'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  ],
}

export default config
