import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema, configValidationValue } from './config.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';

// console.log(process.env.STAGE)
// "start:dev": "set STAGE=dev && nest start --watch" in package.json for windows
// and "start:dev": "STAGE=dev nest start --watch" for *NIX and MAC

const configEnvPath = ('.env.stage.' + process.env.STAGE).trim();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [configEnvPath],
      validationSchema: configValidationSchema, 
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Record<configValidationValue, unknown>, false>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver
    }),
    UsersModule
  ],
})
export class AppModule {}
