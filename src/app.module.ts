import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameModifiersModule } from './name-modifiers/name-modifiers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,

      // For dev only. In prod use migrations.
      synchronize: true,

      // Helpful in dev
      retryAttempts: 30,
      retryDelay: 2000,
    }),
    NameModifiersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
