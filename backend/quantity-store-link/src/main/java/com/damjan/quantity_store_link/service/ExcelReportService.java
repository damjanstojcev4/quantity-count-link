package com.damjan.quantity_store_link.service;

import com.damjan.quantity_store_link.entity.Item;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExcelReportService {
    private final ItemService itemService;

    public ExcelReportService(ItemService itemService) {
        this.itemService = itemService;
    }


    public byte[] exportItemsToExcel() {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Items");

            // Header style
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Артикал", "Шифра", "Цена", "Количина"};

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Fetch data
            List<Item> items = itemService.findAll();

            int rowNum = 1;
            for (Item item : items) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(item.getId());
                row.createCell(1).setCellValue(item.getArticle());
                row.createCell(2).setCellValue(item.getSku());
                row.createCell(3).setCellValue(item.getPrice());
                row.createCell(4).setCellValue(item.getQuantity());
            }

            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Write to byte array
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to export Excel file");
        }
    }
}
