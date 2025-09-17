create database bd_fbc_brinquedos;
use bd_fbc_brinquedos;

create table usuario (
	id_usuario INT primary key auto_increment,
    nome varchar(100) NOT NULL,
    userEmail varchar(100) UNIQUE NOT NULL,
    userSenha varchar(100) NOT NULL
);

alter table usuario
change email userEmail varchar(100),
change senha userSenha varchar(100);

desc usuario;

select * from usuario;

create table categoria (
	id_categoria INT primary key auto_increment,
    nome_categoria varchar(50) unique not null
);

select * from categoria;

create table produto (
	id_produto int primary key auto_increment,
    codigo_produto varchar(20) not null,
    nome_produto varchar(100) not null,
    marca_produto varchar(100) not null,
    imagem_produto varchar(255),
    valor_produto decimal(10,2),
    descricao_produto text,
    id_usuario int,
    id_categoria int,
    foreign key(id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key(id_categoria) references categoria(id_categoria) on delete set null
);

desc produto;

insert into categoria (nome_categoria) values
('Bonecos'),
('Jogos de Tabuleiro'),
('Carrinhos'),
('Quebra-Cabeças');


insert into usuario (nome, email, senha) values
('Gilson', 'gilson-email@mail.com', '1234'),
('Maikon', 'maikon-email@mail.com', '1234'),
('Mateus', 'mateus-email@mail.com', '1234');