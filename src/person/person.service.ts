import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { Axios } from 'axios';

@Injectable()
export class PersonService {

  @InjectRepository(Person)
  private readonly personRepository : Repository<Person>

  async searchZipCode(zipCode: string) {
    try {
      const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      return address.data
    } catch (error) {
      console.error("Erro ao buscar CEP:", error.message);
    }
    
  }

  async create(createPersonDto: CreatePersonDto) : Promise<Person> {
    let person = await this.personRepository.create(createPersonDto)
    const address = await this.searchZipCode(person.zip_code)
    
    if (address) {
      person.address = address.logradouro;
      person.district = address.bairro;
      person.city = address.localidade;
      person.state = address.estado;
      person.city_code = address.ibge;
      person.uf_state = address.uf;
    }

    return await this.personRepository.save(person);

  }

  async findAll() : Promise<Person[]> {
    return await this.personRepository.find()
  }

  async findOne(id: number) : Promise<Person | null> {
    const person = await this.personRepository.findOneBy({ id })
    return person
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
