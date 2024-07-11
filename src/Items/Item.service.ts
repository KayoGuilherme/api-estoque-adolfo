import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-Item.dto';
import { UpdateItemDto } from './dto/update-Item.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaClient) {}

  async get() {
    try {
      const Company = await this.prisma.items.findMany();
      return {
        message: 'Lista de Items',
        Company,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Nao foi possivel visalizar os Items.');
    }
  }

  async getById(id: number) {
    try {
      const ProductExist = await this.prisma.items.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!ProductExist) throw new NotFoundException('Esse Item não existe');

      const Product = await this.prisma.items.findUnique({
        where: {
          id: Number(id),
        },
      });
      return Product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro interno do servidor', error);
    }
  }

  async getItemByLab(lab_id: number) {
    try {
      const getItemLab = await this.prisma.items.findMany({
        where: {
          lab_id: Number(lab_id),
        },
      });

      if (!getItemLab) return new NotFoundException('Item não encontrado');

      return getItemLab;
    } catch (error) {
        console.log(error)
        throw new BadRequestException("Erro interno do servidor", error)
    }
  }

  async create(data: CreateItemDto) {
    try {
      const product = this.prisma.items.create({
        data,
      });

      return product;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Erro interno do servidor', e);
    }
  }

  async update(
    id: number,
    { nome_item, estoque, component_id }: UpdateItemDto,
  ) {
    try {
      const ItemExist = await this.prisma.items.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!ItemExist) throw new NotFoundException('Esse Item nao existe');

      const item = await this.prisma.items.update({
        data: {
          nome_item,
          estoque,
          component_id,
        },
        where: {
          id: Number(id),
        },
      });

      return {
        message: 'Item Atualizado com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }

  async delete(id: number) {
    try {
      const productExist = await this.prisma.items.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!productExist)
        throw new NotFoundException(`Esse Item do id: ${id} não existe`);

      await this.prisma.items.delete({
        where: {
          id: Number(id),
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('erro interno do servidor', error);
    }
  }
}
