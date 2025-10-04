package com.damjan.quantity_store_link;

import com.damjan.quantity_store_link.entity.Item;
import com.damjan.quantity_store_link.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Optional<Item> findBySku(int sku) {
        return itemRepository.findBySku(sku);
    }

    @Transactional
    public Item save(Item item) {
        if (itemRepository.existsBySku(item.getSku())) {
            throw new IllegalArgumentException("Item with SKU " + item.getSku() + " already exists");
        }
        return itemRepository.save(item);
    }

    @Transactional
    public Item updateItem(int sku, Item updatedItem) {
        return itemRepository.findBySku(sku)
                .map(item -> {
                    item.setArticle(updatedItem.getArticle());
                    item.setPrice(updatedItem.getPrice());
                    item.setQuantity(updatedItem.getQuantity());
                    return itemRepository.save(item);
                })
                .orElseThrow(() -> new IllegalArgumentException("Item not found with SKU: " + sku));
    }

    @Transactional
    public Item incrementQuantity(int sku) {
        Item item = itemRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with SKU: " + sku));
        item.setQuantity(item.getQuantity() + 1);
        return itemRepository.save(item);
    }

    @Transactional
    public Item decrementQuantity(int sku) {
        Item item = itemRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with SKU: " + sku));
        int currentQty = item.getQuantity();
        if (currentQty == 0) {
            throw new IllegalStateException("Quantity cannot be less than 0");
        }
        item.setQuantity(currentQty - 1);
        return itemRepository.save(item);
    }

    @Transactional
    public void deleteItem(int sku) {
        if (!itemRepository.existsBySku(sku)) {
            throw new IllegalArgumentException("Item not found with SKU: " + sku);
        }
        itemRepository.deleteBySku(sku);
    }
}
