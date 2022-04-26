import { plainToClass } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  PORT?: number;

  @IsString()
  @IsNotEmpty() 
  NODE_ORACLEDB_USER: string;

  @IsString()
  @IsNotEmpty()
  NODE_ORACLEDB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  NODE_ORACLEDB_LIBDIR_PATH: string;

  @IsString()
  @IsNotEmpty()
  NODE_ORACLEDB_CONNECTION_STRING: string;
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