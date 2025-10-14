package com.damjan.quantity_store_link.controller;

import com.damjan.quantity_store_link.entity.Item;
import com.damjan.quantity_store_link.service.ExcelReportService;
import com.damjan.quantity_store_link.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/link")
public class ItemController {
    private final ItemService itemService;
    private final ExcelReportService excelReportService;

    @Autowired
    public ItemController(ItemService itemService, ExcelReportService excelReportService) {
        this.itemService = itemService;
        this.excelReportService = excelReportService;
    }

    @GetMapping("/")
    public List<Item> getAllItems() {
        return itemService.findAll();
    }

    @GetMapping("/{sku}")
    public Item getItemBySku(@PathVariable int sku) {
        return itemService.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with SKU: " + sku));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportToExcel() {
        byte[] excelData = excelReportService.exportItemsToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=zaliha.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelData);
    }

    @PostMapping("/")
    public Item createItem(@RequestBody Item item) {
        return itemService.save(item);
    }

    @PutMapping("/{sku}")
    public Item updateItem(@PathVariable int sku, @RequestBody Item updatedItem) {
        return itemService.updateItem(sku, updatedItem);
    }

    @DeleteMapping("/{sku}")
    public void deleteItem(@PathVariable int sku) {
        itemService.deleteItem(sku);
    }

    @PatchMapping("/{sku}/increment")
    public Item incrementQuantity(@PathVariable int sku) {
        return itemService.incrementQuantity(sku);
    }

    @PatchMapping("/{sku}/decrement")
    public Item decrementQuantity(@PathVariable int sku) {
        return itemService.decrementQuantity(sku);
    }
}
