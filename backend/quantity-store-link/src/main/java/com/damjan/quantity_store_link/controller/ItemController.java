package com.damjan.quantity_store_link.controller;

import com.damjan.quantity_store_link.entity.Item;
import com.damjan.quantity_store_link.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/link")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // --- Get all items ---
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.findAll();
    }

    // --- Get single item by SKU ---
    @GetMapping("/{sku}")
    public Item getItemBySku(@PathVariable int sku) {
        return itemService.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with SKU: " + sku));
    }

    // --- Create new item ---
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.save(item);
    }

    // --- Update item by SKU ---
    @PutMapping("/{sku}")
    public Item updateItem(@PathVariable int sku, @RequestBody Item updatedItem) {
        return itemService.updateItem(sku, updatedItem);
    }

    // --- Delete item by SKU ---
    @DeleteMapping("/{sku}")
    public void deleteItem(@PathVariable int sku) {
        itemService.deleteItem(sku);
    }

    // --- Increment quantity ---
    @PatchMapping("/{sku}/increment")
    public Item incrementQuantity(@PathVariable int sku) {
        return itemService.incrementQuantity(sku);
    }

    // --- Decrement quantity ---
    @PatchMapping("/{sku}/decrement")
    public Item decrementQuantity(@PathVariable int sku) {
        return itemService.decrementQuantity(sku);
    }
}
