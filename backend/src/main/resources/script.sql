create database bd_fbc_brinquedos;
use bd_fbc_brinquedos;

create table usuario (
	id_usuario INT primary key auto_increment,
    nome varchar(100) NOT NULL,
    userEmail varchar(100) UNIQUE NOT NULL,
    userSenha varchar(100) NOT NULL
);

desc usuario;
select * from usuario;

create table categoria (
	id_categoria INT primary key auto_increment,
    nome_categoria varchar(50) unique not null
);

DROP TABLE categoria;

select * from categoria;

create table brinquedo (
	id int primary key auto_increment,
    codigo varchar(10) not null,
    nome varchar(100) not null,
    marca varchar(100) not null,
    imagem varchar(255),
    valor decimal(10,2),
    detalhes text,
    quantVendas int
);

DESC brinquedo;

insert into brinquedo (codigo, nome, marca, imagem, valor,  detalhes, quantVendas)
values ("1BL1544", "Boneco Max Steel", "Hasbro", "https://a-static.mlcdn.com.br/1500x1500/conjunto-boneco-articulado-menino-max-steel-e-animal-pantera-com-acessorios-mattel-brinquedos-fdt75/topsvirtual/14481951998/8ffedb647069617f46e0fc72bcbf684e.jpeg", 47.99, "Novo boneco do Max Steel versão 2025", 18);

desc brinquedo;
SELECT * FROM brinquedo;

insert into categoria (nome_categoria) values
('Bonecos'),
('Jogos de Tabuleiro'),
('Carrinhos'),
('Quebra-Cabeças');


insert into usuario (nome, email, senha) values
('Gilson', 'gilson-email@mail.com', '1234'),
('Maikon', 'maikon-email@mail.com', '1234'),
('Mateus', 'mateus-email@mail.com', '1234');