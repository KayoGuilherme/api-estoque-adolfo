import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ComponentsCategoryDto } from './dto/create-components-category.dto';
import { UpdateComponentsCategoryDto } from './dto/update-components-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComponentItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: ComponentsCategoryDto) {
    try {
      const component = this.prisma.components.create({
        data,
      });

      return component;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro: não foi possivel criar o componente',
      );
    }
  }

  async getCategory() {
    try {
      const getComponent = await this.prisma.components.findMany({
        include: {
          Category: {
            select: {
              nome: true,
              item: {
                select: {
                  nome: true,
                  estoque: true,
                }
              }
            },
          },
        },
      });

      return getComponent;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao visualizar Componentes');
    }
  }

  async getCategoryById(id_component: number) {
    try {
      const getComponent = await this.prisma.components.findFirst({
        where: {
          id_component,
        },
        include: {
          Category: {
            select: {
              nome: true,
              item: {
                select: {
                  nome: true,
                  estoque: true,
                },
              },
            },
          },
        },
      });

      return getComponent;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao visualizar Componentes');
    }
  }

  async update({ nome_component }: UpdateComponentsCategoryDto, id: number) {
    try {
      const categoryExist = await this.prisma.category.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!categoryExist)
        throw new BadRequestException('Esse Componente não existe.');

      const category = await this.prisma.components.update({
        where: {
          id_component: Number(id),
        },
        data: {
          nome_component,
        },
      });

      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Não foi possivel atualizar este componente.',
      );
    }
  }

  async delete(id_component: number) {
    try {
      const categoryExist = await this.prisma.components.findFirst({
        where: {
          id_component: Number(id_component),
        },
      });

      if (!categoryExist)
        throw new BadRequestException('Esse componente não existe.');

      await this.prisma.components.delete({
        where: {
          id_component: Number(id_component),
        },
      });

      return { sucess: true };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Não foi possivel deletar esse componente.',
      );
    }
  }
}
