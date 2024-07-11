import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateComponentDTO } from './dto/create-components.dto';
import { UpdateComponentDto } from './dto/update-components.dto';

@Injectable()
export class ComponentItemService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCompany(data: CreateComponentDTO) {
    try {
      const component = this.prisma.components.create({
        data,
      });

      return component;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async getComponent() {
    try {
      const getComponents = await this.prisma.components.findMany({
        include: {
          Items: {
            select: {
              id: true,
              nome_item: true,
              estoque: true,
            },
          },
        },
      });

      return getComponents;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async getComponentById(id: number) {
    try {
      const getComponents = await this.prisma.components.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          Items: {
            select: {
              id: true,
              nome_item: true,
              estoque: true,
            },
          },
        },
      });

      if (!getComponents)
        return new NotFoundException('Componente não existe na base de dados');

      return getComponents;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async update({ nome_componente }: UpdateComponentDto, id: number) {
    try {
      const componentExist = await this.prisma.components.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!componentExist)
        return new NotFoundException('Esse componente não existe.');

      const Component = await this.prisma.components.update({
        where: {
          id: Number(id),
        },
        data: {
          nome_componente,
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
      const componentExist = await this.prisma.components.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!componentExist)
        return new NotFoundException('Esse componente não existe.');

      const deleteComponent = await this.prisma.components.delete({
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
