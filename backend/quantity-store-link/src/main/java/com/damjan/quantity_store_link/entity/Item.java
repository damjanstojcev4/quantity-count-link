package com.damjan.quantity_store_link.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String article;

    @Column(unique=true)

    private int sku;

    private int price;

    private int quantity;
}