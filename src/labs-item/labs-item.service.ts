import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LabsDto } from './dto/create-components-category.dto';
import { UpdateLabsDto } from './dto/update-components-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LabService {
  constructor(private readonly prisma: PrismaService) {}

  async createLab(data: LabsDto) {
    try {
      const lab = this.prisma.labs.create({
        data,
      });

      return lab;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async getLab() {
    try {
      const getLab = await this.prisma.labs.findMany();

      return getLab;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async getLabById(id: number) {
    try {
      const getLab = await this.prisma.labs.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!getLab) {
        return new NotFoundException('Laboratorio não encontrado');
      }

      return getLab;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async update({ nome_lab }: UpdateLabsDto, id: number) {
    try {
      const getlab = await this.prisma.labs.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!getlab) return new NotFoundException('Esse Componente não existe.');

      const lab = await this.prisma.labs.update({
        where: {
          id: Number(id),
        },
        data: {
          nome_lab,
        },
      });

      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async delete(id: number) {
    try {
      const labExist = await this.prisma.labs.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!labExist)
        return new NotFoundException('Esse componente não existe.');

      await this.prisma.components.delete({
        where: {
          id: Number(id),
        },
      });

      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }
}
