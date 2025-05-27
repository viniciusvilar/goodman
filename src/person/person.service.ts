import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { Axios } from 'axios';
import { error } from 'console';

@Injectable()
export class PersonService {

  @InjectRepository(Person)
  private readonly personRepository : Repository<Person>

  async searchZipCode(zipCode: string) {
    try {
      const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      return address.data
    } catch (error) {
      console.error("Error to finding CEP:", error.message);
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

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.findOne(id);
    if (!person) {
      throw new Error('Person not found');
    }
  
    const mergedPerson = this.personRepository.merge(person, updatePersonDto);
  
    if (updatePersonDto.zip_code) {
      const address = await this.searchZipCode(updatePersonDto.zip_code);
      if (address) {
        mergedPerson.address = address.logradouro;
        mergedPerson.district = address.bairro;
        mergedPerson.city = address.localidade;
        mergedPerson.state = address.estado;
        mergedPerson.city_code = address.ibge;
        mergedPerson.uf_state = address.uf;
      }
    }
  
    return await this.personRepository.save(mergedPerson);
  }
  

  async remove(id: number) : Promise<Person> {
    const person = await this.findOne(id)
    if (!person) {
      throw new Error("Person not exists!")
    }
    if (person.active) {
      person.active = false
      await this.personRepository.save(person)
      return person
    }
    throw new Error("Person already false!")
  }


  async active (id: number) : Promise<Person> {
    const person = await this.findOne(id)
    if (!person) {
      throw new Error("Person not exists!")
    }
    if(!person.active) {
      person.active = true
      return await this.personRepository.save(person)
    }
    throw new Error("Person already false!")
  }
}
