import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaModule } from './database/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryItemModule } from './components/components.module';
import { ItemModule } from './Items/Item.module';
import { ComponentsCategoryModule } from './labs-item/labs-item.module';



@Module({
  imports: [
     forwardRef(() => UsersModule),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
      serveRoot: 'swagger',
    }),
    
    PrismaModule,
    CategoryItemModule,
    ItemModule,
    AuthModule,
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'mertie35@ethereal.email',
          pass: 'K86wZVKCPtbUE276P6'
        }
      },
      defaults: {
        from: '"kayo" <mertie35@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        options: {
          strict: true,
        },
      },

    }),
    ComponentsCategoryModule
  ],
  controllers: [
     AppController],
  providers: [AppService],
})
export class AppModule { }
