import { IsInt, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsString()
    tax: string;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(3, 3)
    cst: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    csosn: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    cfop_consumo_interna: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    cfop_consumo_externa: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    cfop_venda_interna: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    cfop_venda_externa: number;
    
    @Column({ type: "float", nullable: true })
    @IsOptional()
    @IsNumber()
    aliquota_icms: number;
    
    @Column({ type: "float", nullable: true })
    @IsOptional()
    @IsNumber()
    aliquota_reducao: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(3, 3)
    cst_pis_cofins: number;
    
    @Column({ type: "float", nullable: true })
    @IsOptional()
    @IsNumber()
    aliquota_pis: number;
    
    @Column({ type: "float", nullable: true })
    @IsOptional()
    @IsNumber()
    aliquota_cofins: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(3, 3)
    cst_cupom: number;
    
    @Column({ type: "int", nullable: true })
    @IsOptional()
    @IsInt()
    @Length(4, 4)
    cfop_cupom: number;
}

