import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  @InjectRepository(Payment)
  private readonly paymentRepository : Repository<Payment>

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.create(createPaymentDto)

    return await this.paymentRepository.save(payment)

  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find()
  }

  async findOne(id: number) : Promise<Payment | null> {
    const payment = await this.paymentRepository.findOneBy({ id })
    return payment
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new Error('Payment not found');
    }
  
    if (updatePaymentDto.name !== undefined) {
      payment.name = updatePaymentDto.name;
    }
  
    if (updatePaymentDto.type !== undefined) {
      payment.type = updatePaymentDto.type;
    }
  
    return this.paymentRepository.save(payment);
  }

  async inactive(id: number) {
    const payment = await this.findOne(id)

    if (!payment) {
      throw new Error("Finalizadora inexistente")
    }

    if (!payment.active) {
      throw new Error("Finalizadora já está inativa")
    }

    payment.active = false

    return await this.paymentRepository.save(payment)
  }

  async active(id: number) {
    const payment = await this.findOne(id)

    if (!payment) {
      throw new Error("Finalizadora inexistente")
    }

    if (payment.active) {
      throw new Error("Finalizadora já está ativa")
    }

    payment.active = true

    return await this.paymentRepository.save(payment)
  }
}
