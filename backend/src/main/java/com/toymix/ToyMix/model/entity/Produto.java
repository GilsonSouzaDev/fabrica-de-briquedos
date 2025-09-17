package com.toymix.ToyMix.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name="produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
