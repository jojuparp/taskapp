import { plainToClass } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
    NODE_ENV: Environment;

  @IsOptional()
  @IsInt()
    PORT: number;

  @IsString()
  @IsNotEmpty() 
    ORACLEDB_USER: string;

  @IsString()
  @IsNotEmpty()
    ORACLEDB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
    ORACLEDB_CONNECTION_STRING: string;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}