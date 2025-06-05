import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from './unit/unit.module';
import { PersonModule } from './person/person.module';
import { OrderModule } from './order/order.module';
import { OrderItensModule } from './order-itens/order-itens.module';
import { PaymentModule } from './payment/payment.module';
import { TaxModule } from './tax/tax.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.CONTAINER_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }), 
    ProductsModule, UnitModule, PersonModule, OrderModule, OrderItensModule, PaymentModule, TaxModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
