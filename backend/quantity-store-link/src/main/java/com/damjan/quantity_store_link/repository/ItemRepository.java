package com.damjan.quantity_store_link.repository;

import com.damjan.quantity_store_link.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findBySku(int sku);

    boolean existsBySku(int sku);

    void deleteBySku(int sku);
}
