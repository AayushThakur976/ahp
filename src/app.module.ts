import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes the environment variables accessible globally
    }),
    // Configure TypeORM for MariaDB connection
    TypeOrmModule.forRoot({
      type: 'mariadb', // Database type
      host: process.env.DB_HOST, // Host from .env
      port: parseInt(process.env.DB_PORT, 10), // Port from .env
      username: process.env.DB_USERNAME, // Username from .env
      password: process.env.DB_PASSWORD, // Password from .env
      database: process.env.DB_NAME, // Database name from .env
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Automatically sync database schema (disable in production)
    }),
  ],
  controllers: [], // Add controllers here
  providers: [],   // Add services/providers here
})
export class AppModule {}
