import { Body, Controller, Delete, Get , Param, ParseUUIDPipe, Patch, Post} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';


@Controller('cars')
export class CarsController {
    constructor(
       private readonly CarsService: CarsService,
    ){}

    @Get()
    getAllCars(){
        return this.CarsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id:string){
        return this.CarsService.findOneById(id);
    }

    @Post()
    createCar( @Body() createCarDto: CreateCarDto ) {
        return this.CarsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto) 
    {
        return this.CarsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(
        @Param('id', ParseUUIDPipe) id: string){
        return this.CarsService.delete(id);
    }
}
