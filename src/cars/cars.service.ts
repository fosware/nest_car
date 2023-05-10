import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { exec } from 'child_process';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },

    ];

    findAll(){
        return this.cars;
    }

    findOneById(id: string){
        //return this.cars[id];
        const car = this.cars.find(car => car.id === id);
        if(!car) 
            throw new NotFoundException(`Car with id '${id}' not found`);
        
        return car;
    }

    create(createDto: CreateCarDto){
        const car: Car = {
            id: uuid(), 
            ...createDto
        };
        this.cars.push(car);
        return car;
        
    }

    update(id: string, updateDto: UpdateCarDto ){

        let carDB = this.findOneById(id);

        if(updateDto.id && updateDto.id !== id)
            throw new BadRequestException(`Car id is not valid inside body`);
        

        this.cars = this.cars.map( car => {
            if(car.id == id){
                carDB = { ...carDB, ...updateDto, id }
                return carDB;
            }
            return car;
        })
         
        return carDB;
    }

    delete (id: string) {
        let carDelete = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== carDelete.id);
    }

    fillCarsWithSeedData( cars: Car[] ){
        this.cars = cars;
    }

}
