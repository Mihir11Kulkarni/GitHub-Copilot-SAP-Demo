# 🧪 Test Cases Spotlight: GitHub Copilot Testing Mastery
## Comprehensive Testing Across ABAP, S/4HANA & Fiori Stack

---

## 🎯 Testing Philosophy with GitHub Copilot

GitHub Copilot revolutionizes testing by:
- **Generating comprehensive test suites** from minimal prompts
- **Creating realistic test data** that matches business scenarios  
- **Suggesting edge cases** developers might miss
- **Automating test maintenance** when code changes
- **Providing testing best practices** across different technologies

---

## 🏗️ ABAP Testing with Copilot

### 1. Unit Testing ABAP Business Logic

#### Legacy ABAP Code to Test
```abap
CLASS zcl_inventory_manager DEFINITION PUBLIC.
  PUBLIC SECTION.
    METHODS: calculate_reorder_point
      IMPORTING 
        iv_material TYPE matnr
        iv_plant TYPE werks_d
      RETURNING 
        VALUE(rv_reorder_point) TYPE i.
        
  PRIVATE SECTION.
    METHODS: get_average_consumption
      IMPORTING 
        iv_material TYPE matnr
        iv_plant TYPE werks_d
      RETURNING 
        VALUE(rv_avg_consumption) TYPE p DECIMALS 2.
ENDCLASS.

CLASS zcl_inventory_manager IMPLEMENTATION.
  METHOD calculate_reorder_point.
    DATA: lv_avg_consumption TYPE p DECIMALS 2,
          lv_lead_time TYPE i VALUE 7,
          lv_safety_stock TYPE i VALUE 10.
    
    lv_avg_consumption = get_average_consumption( iv_material = iv_material
                                                  iv_plant = iv_plant ).
    
    rv_reorder_point = ( lv_avg_consumption * lv_lead_time ) + lv_safety_stock.
  ENDMETHOD.
ENDCLASS.
```

#### Copilot Test Generation Prompts

**🔹 Basic Unit Test Generation:**
```
Generate ABAP unit tests for zcl_inventory_manager class with the following scenarios:
1. Normal reorder point calculation with typical values
2. Zero consumption scenario
3. High consumption scenario (>1000 units/day)
4. Invalid material number handling
5. Different plant scenarios

Include test data setup and assertions using cl_abap_unit_assert.
```

**Generated ABAP Unit Tests:**
```abap
CLASS ltc_inventory_manager DEFINITION FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS.
  
  PRIVATE SECTION.
    DATA: mo_cut TYPE REF TO zcl_inventory_manager.
    
    METHODS: setup,
             test_normal_reorder_calculation,
             test_zero_consumption,
             test_high_consumption,
             test_invalid_material,
             test_different_plants.
ENDCLASS.

CLASS ltc_inventory_manager IMPLEMENTATION.
  METHOD setup.
    mo_cut = NEW zcl_inventory_manager( ).
  ENDMETHOD.
  
  METHOD test_normal_reorder_calculation.
    " Given - Normal material with regular consumption
    DATA: lv_material TYPE matnr VALUE 'MAT001',
          lv_plant TYPE werks_d VALUE '1000',
          lv_expected TYPE i VALUE 80,  " (10 * 7) + 10
          lv_actual TYPE i.
    
    " When - Calculate reorder point
    lv_actual = mo_cut->calculate_reorder_point( iv_material = lv_material
                                                iv_plant = lv_plant ).
    
    " Then - Should return expected reorder point
    cl_abap_unit_assert=>assert_equals(
      act = lv_actual
      exp = lv_expected
      msg = 'Reorder point calculation failed for normal scenario'
    ).
  ENDMETHOD.
  
  METHOD test_zero_consumption.
    " Given - Material with zero consumption
    DATA: lv_material TYPE matnr VALUE 'MAT002',
          lv_plant TYPE werks_d VALUE '1000',
          lv_expected TYPE i VALUE 10,  " 0 + safety stock
          lv_actual TYPE i.
    
    " When - Calculate reorder point
    lv_actual = mo_cut->calculate_reorder_point( iv_material = lv_material
                                                iv_plant = lv_plant ).
    
    " Then - Should return safety stock only
    cl_abap_unit_assert=>assert_equals(
      act = lv_actual
      exp = lv_expected
      msg = 'Zero consumption should return safety stock only'
    ).
  ENDMETHOD.
  
  METHOD test_high_consumption.
    " Given - High consumption material
    DATA: lv_material TYPE matnr VALUE 'MAT003',
          lv_plant TYPE werks_d VALUE '1000',
          lv_expected TYPE i VALUE 7010,  " (1000 * 7) + 10
          lv_actual TYPE i.
    
    " When - Calculate reorder point
    lv_actual = mo_cut->calculate_reorder_point( iv_material = lv_material
                                                iv_plant = lv_plant ).
    
    " Then - Should handle high values correctly
    cl_abap_unit_assert=>assert_equals(
      act = lv_actual
      exp = lv_expected
      msg = 'High consumption calculation failed'
    ).
  ENDMETHOD.
ENDCLASS.
```

### 2. Integration Testing ABAP with Database

**🔹 Database Integration Test Prompt:**
```
Generate ABAP integration tests for material master data retrieval that:
1. Tests database connectivity and query performance
2. Validates data consistency across related tables (MARA, MARD, MARC)
3. Handles database exceptions gracefully
4. Tests with realistic SAP data volumes
5. Includes performance benchmarks (<100ms response time)

Use ABAP Test Double Framework for database mocking where appropriate.
```

**Generated Integration Tests:**
```abap
CLASS ltc_material_integration DEFINITION FOR TESTING
  DURATION MEDIUM
  RISK LEVEL HARMLESS.
  
  PRIVATE SECTION.
    DATA: mo_material_service TYPE REF TO zcl_material_service,
          mo_sql_test_double TYPE REF TO if_sql_test_double.
    
    METHODS: setup,
             test_material_retrieval_performance,
             test_database_exception_handling,
             test_data_consistency_validation,
             test_large_dataset_handling.
ENDCLASS.

CLASS ltc_material_integration IMPLEMENTATION.
  METHOD setup.
    mo_material_service = NEW zcl_material_service( ).
    mo_sql_test_double = cl_sql_test_double=>create( ).
  ENDMETHOD.
  
  METHOD test_material_retrieval_performance.
    " Given - Performance requirement <100ms
    DATA: lv_start_time TYPE timestampl,
          lv_end_time TYPE timestampl,
          lv_duration TYPE i,
          lt_materials TYPE zcl_material_service=>tt_materials.
    
    " When - Retrieve materials for plant
    GET TIME STAMP FIELD lv_start_time.
    lt_materials = mo_material_service->get_materials_for_plant( '1000' ).
    GET TIME STAMP FIELD lv_end_time.
    
    " Then - Should complete within performance budget
    lv_duration = cl_abap_tstmp=>subtract( tstmp1 = lv_end_time
                                          tstmp2 = lv_start_time ).
    
    cl_abap_unit_assert=>assert_true(
      act = lv_duration < 100000  " microseconds
      msg = 'Material retrieval exceeded 100ms performance budget'
    ).
  ENDMETHOD.
ENDCLASS.
```

### 3. ABAP Test Data Generation

**🔹 Test Data Generation Prompt:**
```
Generate realistic ABAP test data for inventory management scenarios including:
1. Various material types (FERT, HALB, ROH)
2. Multiple plants and storage locations
3. Different stock quantities and movements
4. Seasonal demand patterns
5. Various supplier relationships

Create both minimal test data for unit tests and comprehensive data for integration tests.
```

---

## 🌐 S/4HANA & CAP Service Testing

### 1. CAP Service Unit Testing

#### CAP Service to Test
```typescript
// srv/inventory-service.ts
import cds from '@sap/cds'

class InventoryService extends cds.ApplicationService {
  async init() {
    const { Product, StockMovement } = this.entities

    this.on('restock', Product, async (req) => {
      const { ID, quantity, reason } = req.data
      
      if (!quantity || quantity <= 0) {
        return req.error(400, 'Quantity must be positive')
      }
      
      const [product] = await SELECT.from(Product).where({ ID })
      if (!product) {
        return req.error(404, 'Product not found')
      }
      
      // Update stock
      await UPDATE(Product)
        .set({ Stock: { '+=': quantity }, LastUpdated: new Date() })
        .where({ ID })
      
      // Log movement
      await INSERT.into(StockMovement).entries({
        ProductID: ID,
        Quantity: quantity,
        MovementType: 'RESTOCK',
        Reason: reason,
        Timestamp: new Date()
      })
      
      // Return updated product
      const [updated] = await SELECT.from(Product).where({ ID })
      return updated
    })
    
    return super.init()
  }
}
```

**🔹 Comprehensive CAP Service Testing Prompt:**
```
Generate comprehensive Jest tests for the InventoryService CAP service covering:

1. Unit Tests:
   - Restock action with valid data
   - Restock with invalid quantity (negative, zero, non-numeric)
   - Restock non-existent product
   - Concurrent restock operations
   - Database transaction handling

2. Integration Tests:
   - End-to-end OData API testing
   - Database persistence validation
   - Error response format validation
   - Performance under load

3. Edge Cases:
   - Maximum integer stock values
   - Unicode characters in reason field
   - Network interruption scenarios
   - Memory pressure conditions

Include realistic test data and proper setup/teardown.
```

**Generated CAP Service Tests:**
```typescript
import cds from '@sap/cds'
import { POST, GET, DELETE } from 'cds/lib/test'

describe('InventoryService', () => {
  let srv: any
  const { Product, StockMovement } = cds.entities('InventoryService')

  beforeAll(async () => {
    srv = await cds.test(__dirname + '/../../')
  })

  beforeEach(async () => {
    // Clean test data
    await DELETE.from(StockMovement)
    await DELETE.from(Product)
    
    // Insert test products
    await INSERT.into(Product).entries([
      { ID: 'product-1', Name: 'Test Widget', Stock: 10, LastUpdated: new Date() },
      { ID: 'product-2', Name: 'Test Gadget', Stock: 0, LastUpdated: new Date() }
    ])
  })

  describe('Restock Action', () => {
    test('should successfully restock product with valid data', async () => {
      // Given
      const restockData = {
        ID: 'product-1',
        quantity: 5,
        reason: 'Regular replenishment'
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', restockData)

      // Then
      expect(response.status).toBe(200)
      expect(response.data.Stock).toBe(15)  // 10 + 5
      expect(response.data.LastUpdated).toBeDefined()

      // Verify stock movement was logged
      const movements = await SELECT.from(StockMovement).where({ ProductID: 'product-1' })
      expect(movements).toHaveLength(1)
      expect(movements[0].Quantity).toBe(5)
      expect(movements[0].MovementType).toBe('RESTOCK')
    })

    test('should reject restock with negative quantity', async () => {
      // Given
      const invalidData = {
        ID: 'product-1',
        quantity: -5,
        reason: 'Invalid operation'
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', invalidData)

      // Then
      expect(response.status).toBe(400)
      expect(response.data.error.message).toContain('Quantity must be positive')

      // Verify no stock movement was logged
      const movements = await SELECT.from(StockMovement)
      expect(movements).toHaveLength(0)
    })

    test('should handle concurrent restock operations safely', async () => {
      // Given
      const concurrentRequests = Array(10).fill(null).map(() => 
        POST('/odata/v4/InventoryService/restock', {
          ID: 'product-1',
          quantity: 1,
          reason: 'Concurrent test'
        })
      )

      // When
      const results = await Promise.all(concurrentRequests)

      // Then
      results.forEach(result => {
        expect(result.status).toBe(200)
      })

      // Verify final stock is correct (10 + 10 concurrent additions)
      const [finalProduct] = await SELECT.from(Product).where({ ID: 'product-1' })
      expect(finalProduct.Stock).toBe(20)

      // Verify all movements were logged
      const movements = await SELECT.from(StockMovement).where({ ProductID: 'product-1' })
      expect(movements).toHaveLength(10)
    })

    test('should handle product not found scenario', async () => {
      // Given
      const nonExistentProduct = {
        ID: 'non-existent',
        quantity: 5,
        reason: 'Test not found'
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', nonExistentProduct)

      // Then
      expect(response.status).toBe(404)
      expect(response.data.error.message).toContain('Product not found')
    })
  })

  describe('Performance Tests', () => {
    test('restock operation should complete within 200ms', async () => {
      // Given
      const startTime = Date.now()
      const restockData = {
        ID: 'product-1',
        quantity: 100,
        reason: 'Performance test'
      }

      // When
      await POST('/odata/v4/InventoryService/restock', restockData)
      const duration = Date.now() - startTime

      // Then
      expect(duration).toBeLessThan(200)
    })

    test('should handle large quantity values efficiently', async () => {
      // Given
      const largeQuantity = 999999999
      const restockData = {
        ID: 'product-1',
        quantity: largeQuantity,
        reason: 'Large quantity test'
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', restockData)

      // Then
      expect(response.status).toBe(200)
      expect(response.data.Stock).toBe(10 + largeQuantity)
    })
  })

  describe('Edge Cases', () => {
    test('should handle Unicode characters in reason field', async () => {
      // Given
      const unicodeReason = 'Replenishment 补货 🔄 test'
      const restockData = {
        ID: 'product-1',
        quantity: 3,
        reason: unicodeReason
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', restockData)

      // Then
      expect(response.status).toBe(200)
      
      const [movement] = await SELECT.from(StockMovement).where({ ProductID: 'product-1' })
      expect(movement.Reason).toBe(unicodeReason)
    })

    test('should validate input types correctly', async () => {
      // Given
      const invalidTypeData = {
        ID: 'product-1',
        quantity: 'not-a-number',
        reason: 'Type validation test'
      }

      // When
      const response = await POST('/odata/v4/InventoryService/restock', invalidTypeData)

      // Then
      expect(response.status).toBe(400)
    })
  })
})
```

### 2. OData Integration Testing

**🔹 OData Integration Testing Prompt:**
```
Generate comprehensive OData integration tests for S/4HANA Product service that validate:

1. CRUD Operations:
   - CREATE with required/optional fields
   - READ with various filter combinations
   - UPDATE with partial data
   - DELETE with dependency checks

2. OData Features:
   - $select, $expand, $filter, $orderby
   - $top, $skip pagination
   - $batch operations
   - $metadata validation

3. Error Handling:
   - Invalid OData syntax
   - Authorization failures
   - Concurrent access conflicts
   - Network timeout scenarios

4. Performance:
   - Large result set handling
   - Complex filter performance
   - Batch operation efficiency

Use real OData client libraries and realistic SAP data scenarios.
```

**Generated OData Integration Tests:**
```typescript
import { ODataService } from '@sap/odata-client'
import { ProductApi } from './generated/product-api'

describe('Product OData Integration', () => {
  let productApi: ProductApi
  const testProducts: any[] = []

  beforeAll(async () => {
    productApi = new ProductApi({
      url: process.env.ODATA_SERVICE_URL,
      auth: {
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD
      }
    })
  })

  afterEach(async () => {
    // Cleanup test products
    for (const product of testProducts) {
      try {
        await productApi.delete(product.ID)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    testProducts.length = 0
  })

  describe('CRUD Operations', () => {
    test('should create product with all fields', async () => {
      // Given
      const newProduct = {
        Name: 'Integration Test Product',
        Description: 'Created by automated test',
        Stock: 100,
        Price: 29.99,
        Category: 'Electronics'
      }

      // When
      const created = await productApi.create(newProduct)
      testProducts.push(created)

      // Then
      expect(created.ID).toBeDefined()
      expect(created.Name).toBe(newProduct.Name)
      expect(created.Stock).toBe(newProduct.Stock)
      expect(created.CreatedAt).toBeDefined()
    })

    test('should read product with expand navigation', async () => {
      // Given - Create product with category
      const product = await productApi.create({
        Name: 'Test Product with Category',
        Stock: 50,
        CategoryID: 'CAT001'
      })
      testProducts.push(product)

      // When
      const retrieved = await productApi
        .getByKey(product.ID)
        .expand('Category')
        .execute()

      // Then
      expect(retrieved.ID).toBe(product.ID)
      expect(retrieved.Category).toBeDefined()
      expect(retrieved.Category.Name).toBeDefined()
    })
  })

  describe('OData Query Features', () => {
    beforeEach(async () => {
      // Setup test data
      const products = await Promise.all([
        productApi.create({ Name: 'Product A', Stock: 10, Price: 100 }),
        productApi.create({ Name: 'Product B', Stock: 20, Price: 200 }),
        productApi.create({ Name: 'Product C', Stock: 30, Price: 300 })
      ])
      testProducts.push(...products)
    })

    test('should filter products by stock range', async () => {
      // When
      const filtered = await productApi
        .getAll()
        .filter('Stock gt 15 and Stock lt 25')
        .execute()

      // Then
      expect(filtered.length).toBe(1)
      expect(filtered[0].Name).toBe('Product B')
      expect(filtered[0].Stock).toBe(20)
    })

    test('should sort products by price descending', async () => {
      // When
      const sorted = await productApi
        .getAll()
        .orderBy('Price desc')
        .execute()

      // Then
      expect(sorted.length).toBeGreaterThanOrEqual(3)
      expect(sorted[0].Price).toBeGreaterThanOrEqual(sorted[1].Price)
      expect(sorted[1].Price).toBeGreaterThanOrEqual(sorted[2].Price)
    })

    test('should handle pagination correctly', async () => {
      // When
      const firstPage = await productApi
        .getAll()
        .top(2)
        .skip(0)
        .execute()
      
      const secondPage = await productApi
        .getAll()
        .top(2)
        .skip(2)
        .execute()

      // Then
      expect(firstPage.length).toBe(2)
      expect(secondPage.length).toBeGreaterThan(0)
      expect(firstPage[0].ID).not.toBe(secondPage[0].ID)
    })
  })

  describe('Batch Operations', () => {
    test('should execute multiple operations in single batch', async () => {
      // Given
      const batchRequest = productApi.batch()

      const product1 = { Name: 'Batch Product 1', Stock: 10 }
      const product2 = { Name: 'Batch Product 2', Stock: 20 }

      // When
      const batchResult = await batchRequest
        .post('/Products', product1)
        .post('/Products', product2)
        .execute()

      // Then
      expect(batchResult.responses).toHaveLength(2)
      expect(batchResult.responses[0].status).toBe(201)
      expect(batchResult.responses[1].status).toBe(201)

      testProducts.push(batchResult.responses[0].body)
      testProducts.push(batchResult.responses[1].body)
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid filter syntax gracefully', async () => {
      // When/Then
      await expect(
        productApi
          .getAll()
          .filter('invalid filter syntax')
          .execute()
      ).rejects.toThrow('Invalid filter')
    })

    test('should handle non-existent resource', async () => {
      // When/Then
      await expect(
        productApi.getByKey('non-existent-id').execute()
      ).rejects.toThrow('Not Found')
    })
  })

  describe('Performance Tests', () => {
    test('should handle large result sets efficiently', async () => {
      // Given
      const startTime = Date.now()

      // When
      const products = await productApi
        .getAll()
        .top(1000)
        .execute()

      const duration = Date.now() - startTime

      // Then
      expect(duration).toBeLessThan(5000) // 5 seconds max
      expect(products.length).toBeLessThanOrEqual(1000)
    })
  })
})
```

---

## 🎨 Fiori UI Testing with Copilot

### 1. QUnit Component Testing

#### Fiori Component to Test
```xml
<!-- ProductList.view.xml -->
<mvc:View
    controllerName="com.company.inventory.controller.ProductList"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    
    <Page title="Product Inventory">
        <content>
            <Table id="productTable" items="{/Products}">
                <headerToolbar>
                    <Toolbar>
                        <SearchField id="searchField" 
                                   placeholder="Search products..."
                                   search="onSearch"/>
                        <ToolbarSpacer/>
                        <Button text="Add Product" press="onAddProduct"/>
                        <Button text="Refresh" press="onRefresh"/>
                    </Toolbar>
                </headerToolbar>
                
                <columns>
                    <Column><Text text="Name"/></Column>
                    <Column><Text text="Stock"/></Column>
                    <Column><Text text="Status"/></Column>
                    <Column><Text text="Actions"/></Column>
                </columns>
                
                <items>
                    <ColumnListItem press="onProductSelect">
                        <Text text="{Name}"/>
                        <Text text="{Stock}"/>
                        <ObjectStatus text="{Status}" 
                                    state="{path: 'Stock', formatter: '.formatStockStatus'}"/>
                        <Button text="Restock" press="onRestock"/>
                    </ColumnListItem>
                </items>
            </Table>
        </content>
    </Page>
</mvc:View>
```

**🔹 QUnit Component Testing Prompt:**
```
Generate comprehensive QUnit tests for the ProductList Fiori component covering:

1. Component Lifecycle:
   - Component initialization
   - View rendering
   - Model binding
   - Cleanup on destroy

2. User Interactions:
   - Search functionality
   - Product selection
   - Add product button
   - Refresh button
   - Restock action

3. Data Binding:
   - Model updates reflect in UI
   - Formatter functions work correctly
   - Event handling propagation

4. Responsive Behavior:
   - Table adapts to screen size
   - Touch interactions work
   - Accessibility features

5. Error Scenarios:
   - Network failures
   - Invalid data handling
   - User permission errors

Include realistic test data and proper setup/teardown for UI5 testing.
```

**Generated QUnit Tests:**
```javascript
sap.ui.define([
  'com/company/inventory/controller/ProductList',
  'sap/ui/core/mvc/XMLView',
  'sap/ui/model/json/JSONModel',
  'sap/ui/qunit/utils/createAndAppendDiv'
], function(ProductListController, XMLView, JSONModel, createAndAppendDiv) {
  'use strict';

  QUnit.module('ProductList Component', {
    beforeEach: async function() {
      this.oDiv = createAndAppendDiv('qunit-fixture')
      
      // Create test data
      this.oTestData = {
        Products: [
          { ID: '1', Name: 'Widget A', Stock: 25, Status: 'Available' },
          { ID: '2', Name: 'Widget B', Stock: 3, Status: 'Low Stock' },
          { ID: '3', Name: 'Widget C', Stock: 0, Status: 'Out of Stock' }
        ]
      }
      
      // Create view with controller
      this.oView = await XMLView.create({
        viewName: 'com.company.inventory.view.ProductList',
        controller: new ProductListController()
      })
      
      this.oModel = new JSONModel(this.oTestData)
      this.oView.setModel(this.oModel)
      
      this.oView.placeAt(this.oDiv)
      sap.ui.getCore().applyChanges()
      
      this.oController = this.oView.getController()
      this.oTable = this.oView.byId('productTable')
    },
    
    afterEach: function() {
      this.oView.destroy()
      this.oDiv.remove()
    }
  })

  QUnit.test('Component should initialize correctly', function(assert) {
    // Then
    assert.ok(this.oView, 'View should be created')
    assert.ok(this.oController, 'Controller should be instantiated')
    assert.ok(this.oTable, 'Product table should be rendered')
    assert.equal(this.oTable.getItems().length, 3, 'Table should show 3 products')
  })

  QUnit.test('Product data should be displayed correctly', function(assert) {
    // Given
    const aItems = this.oTable.getItems()
    
    // Then
    assert.equal(aItems[0].getCells()[0].getText(), 'Widget A', 'First product name displayed')
    assert.equal(aItems[0].getCells()[1].getText(), '25', 'First product stock displayed')
    assert.equal(aItems[1].getCells()[0].getText(), 'Widget B', 'Second product name displayed')
    assert.equal(aItems[1].getCells()[1].getText(), '3', 'Second product stock displayed')
  })

  QUnit.test('Search functionality should filter products', function(assert) {
    // Given
    const oSearchField = this.oView.byId('searchField')
    const done = assert.async()
    
    // When
    oSearchField.setValue('Widget A')
    oSearchField.fireSearch({ query: 'Widget A' })
    
    setTimeout(() => {
      // Then
      const aVisibleItems = this.oTable.getItems().filter(item => item.getVisible())
      assert.equal(aVisibleItems.length, 1, 'Only one product should be visible')
      assert.equal(aVisibleItems[0].getCells()[0].getText(), 'Widget A', 'Correct product filtered')
      done()
    }, 100)
  })

  QUnit.test('Stock status formatter should work correctly', function(assert) {
    // Given
    const oController = this.oController
    
    // When/Then
    assert.equal(oController.formatStockStatus(25), 'Success', 'High stock shows Success')
    assert.equal(oController.formatStockStatus(3), 'Warning', 'Low stock shows Warning')
    assert.equal(oController.formatStockStatus(0), 'Error', 'No stock shows Error')
  })

  QUnit.test('Add product button should trigger navigation', function(assert) {
    // Given
    const oAddButton = this.oView.byId('addButton')
    const oSpy = sinon.spy(this.oController, 'onAddProduct')
    
    // When
    oAddButton.firePress()
    
    // Then
    assert.ok(oSpy.calledOnce, 'Add product handler should be called')
    oSpy.restore()
  })

  QUnit.test('Refresh button should reload data', function(assert) {
    // Given
    const oRefreshButton = this.oView.byId('refreshButton')
    const oSpy = sinon.spy(this.oModel, 'refresh')
    
    // When
    oRefreshButton.firePress()
    
    // Then
    assert.ok(oSpy.calledOnce, 'Model refresh should be called')
    oSpy.restore()
  })

  QUnit.test('Restock button should trigger restock dialog', function(assert) {
    // Given
    const aItems = this.oTable.getItems()
    const oRestockButton = aItems[0].getCells()[3] // Assuming restock button is 4th cell
    const oSpy = sinon.spy(this.oController, 'onRestock')
    
    // When
    oRestockButton.firePress()
    
    // Then
    assert.ok(oSpy.calledOnce, 'Restock handler should be called')
    oSpy.restore()
  })

  QUnit.test('Component should handle empty data gracefully', function(assert) {
    // Given
    this.oModel.setData({ Products: [] })
    
    // When
    sap.ui.getCore().applyChanges()
    
    // Then
    assert.equal(this.oTable.getItems().length, 0, 'Table should be empty')
    assert.ok(this.oTable.getNoData(), 'No data message should be shown')
  })

  QUnit.test('Component should handle model update', function(assert) {
    // Given
    const oNewData = {
      Products: [
        { ID: '4', Name: 'New Widget', Stock: 15, Status: 'Available' }
      ]
    }
    
    // When
    this.oModel.setData(oNewData)
    sap.ui.getCore().applyChanges()
    
    // Then
    assert.equal(this.oTable.getItems().length, 1, 'Table should show updated data')
    assert.equal(this.oTable.getItems()[0].getCells()[0].getText(), 'New Widget', 'New product displayed')
  })

  QUnit.test('Component should be accessible', function(assert) {
    // Then
    assert.ok(this.oTable.getAriaLabelledBy(), 'Table should have aria label')
    assert.ok(this.oView.byId('searchField').getPlaceholder(), 'Search field should have placeholder')
    
    // Check if table has proper ARIA attributes
    const oTableDom = this.oTable.getDomRef()
    assert.ok(oTableDom.getAttribute('role'), 'Table should have role attribute')
  })
})
```

### 2. End-to-End UI Testing

**🔹 E2E Testing Prompt:**
```
Generate comprehensive end-to-end tests for the Product Inventory Fiori app using WebDriver/Playwright covering:

1. Complete User Workflows:
   - Login to app
   - Navigate to product list
   - Search and filter products
   - View product details
   - Add new product
   - Update existing product
   - Delete product
   - Logout

2. Cross-Browser Testing:
   - Chrome, Firefox, Safari, Edge
   - Mobile responsive behavior
   - Different screen resolutions

3. Performance Testing:
   - Page load times
   - Search response times
   - Large dataset handling

4. Accessibility Testing:
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast validation

5. Error Scenarios:
   - Network failures
   - Invalid input handling
   - Session timeout

Include realistic test data and proper page object patterns.
```

**Generated E2E Tests:**
```typescript
import { test, expect, Page } from '@playwright/test'

class ProductListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/inventory/products')
    await this.page.waitForLoadState('networkidle')
  }

  async searchProducts(query: string) {
    await this.page.fill('[data-testid="search-field"]', query)
    await this.page.press('[data-testid="search-field"]', 'Enter')
    await this.page.waitForLoadState('networkidle')
  }

  async getProductRows() {
    return this.page.locator('[data-testid="product-row"]')
  }

  async clickAddProduct() {
    await this.page.click('[data-testid="add-product-button"]')
  }

  async clickRefresh() {
    await this.page.click('[data-testid="refresh-button"]')
  }

  async restockProduct(productId: string, quantity: number) {
    await this.page.click(`[data-testid="restock-${productId}"]`)
    await this.page.fill('[data-testid="quantity-input"]', quantity.toString())
    await this.page.click('[data-testid="confirm-restock"]')
  }
}

test.describe('Product Inventory E2E Tests', () => {
  let productListPage: ProductListPage

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page)
    
    // Login before each test
    await page.goto('/login')
    await page.fill('[data-testid="username"]', process.env.TEST_USERNAME!)
    await page.fill('[data-testid="password"]', process.env.TEST_PASSWORD!)
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('**/inventory/products')
  })

  test('should display product list correctly', async ({ page }) => {
    // Given
    await productListPage.goto()

    // Then
    await expect(page.locator('[data-testid="product-table"]')).toBeVisible()
    
    const productRows = await productListPage.getProductRows()
    await expect(productRows).toHaveCountGreaterThan(0)
    
    // Verify table headers
    await expect(page.locator('text=Name')).toBeVisible()
    await expect(page.locator('text=Stock')).toBeVisible()
    await expect(page.locator('text=Status')).toBeVisible()
  })

  test('should search products correctly', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // When
    await productListPage.searchProducts('Widget A')
    
    // Then
    const productRows = await productListPage.getProductRows()
    await expect(productRows).toHaveCount(1)
    await expect(productRows.first().locator('text=Widget A')).toBeVisible()
  })

  test('should handle empty search results', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // When
    await productListPage.searchProducts('NonExistentProduct')
    
    // Then
    await expect(page.locator('[data-testid="no-data-message"]')).toBeVisible()
    await expect(page.locator('text=No products found')).toBeVisible()
  })

  test('should add new product successfully', async ({ page }) => {
    // Given
    await productListPage.goto()
    const initialRowCount = await productListPage.getProductRows().count()
    
    // When
    await productListPage.clickAddProduct()
    
    // Fill new product form
    await page.fill('[data-testid="product-name"]', 'Test Product E2E')
    await page.fill('[data-testid="product-stock"]', '50')
    await page.selectOption('[data-testid="product-category"]', 'Electronics')
    await page.click('[data-testid="save-product"]')
    
    // Wait for navigation back to list
    await page.waitForURL('**/inventory/products')
    
    // Then
    const finalRowCount = await productListPage.getProductRows().count()
    expect(finalRowCount).toBe(initialRowCount + 1)
    
    await expect(page.locator('text=Test Product E2E')).toBeVisible()
  })

  test('should restock product successfully', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // Find a product with low stock
    const lowStockRow = page.locator('[data-testid="product-row"]').filter({
      has: page.locator('[data-testid="stock-status"][class*="Warning"]')
    }).first()
    
    const productId = await lowStockRow.getAttribute('data-product-id')
    const currentStock = await lowStockRow.locator('[data-testid="stock-value"]').textContent()
    
    // When
    await productListPage.restockProduct(productId!, 10)
    
    // Wait for update
    await page.waitForLoadState('networkidle')
    
    // Then
    const updatedRow = page.locator(`[data-product-id="${productId}"]`)
    const newStock = await updatedRow.locator('[data-testid="stock-value"]').textContent()
    
    expect(parseInt(newStock!)).toBe(parseInt(currentStock!) + 10)
  })

  test('should handle network failures gracefully', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // Simulate network failure
    await page.route('**/api/products', route => route.abort())
    
    // When
    await productListPage.clickRefresh()
    
    // Then
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('text=Unable to load products')).toBeVisible()
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // When - Navigate using keyboard
    await page.keyboard.press('Tab') // Should focus search field
    await page.keyboard.type('Widget')
    await page.keyboard.press('Enter')
    
    // Then
    await expect(page.locator('[data-testid="search-field"]')).toBeFocused()
    
    // Continue tabbing to table
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should be able to navigate table with arrow keys
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowUp')
  })

  test('should work on mobile devices', async ({ page, browserName }) => {
    // Given - Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await productListPage.goto()
    
    // Then - Check responsive behavior
    await expect(page.locator('[data-testid="product-table"]')).toBeVisible()
    
    // Check if table adapts to mobile (might become a list)
    const tableClass = await page.locator('[data-testid="product-table"]').getAttribute('class')
    expect(tableClass).toContain('sapMListMode') // SAP UI5 mobile adaptation
  })

  test('should handle session timeout', async ({ page }) => {
    // Given
    await productListPage.goto()
    
    // Simulate session timeout
    await page.route('**/api/**', route => {
      route.fulfill({ status: 401, body: 'Unauthorized' })
    })
    
    // When
    await productListPage.clickRefresh()
    
    // Then - Should redirect to login
    await expect(page).toHaveURL(/.*\/login/)
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
  })

  test.describe('Performance Tests', () => {
    test('should load product list within performance budget', async ({ page }) => {
      // Given
      const startTime = Date.now()
      
      // When
      await productListPage.goto()
      
      const loadTime = Date.now() - startTime
      
      // Then
      expect(loadTime).toBeLessThan(3000) // 3 seconds max
    })

    test('should handle large datasets efficiently', async ({ page }) => {
      // Given - Mock large dataset
      await page.route('**/api/products', route => {
        const largeDataset = Array(1000).fill(null).map((_, i) => ({
          ID: `product-${i}`,
          Name: `Product ${i}`,
          Stock: Math.floor(Math.random() * 100),
          Status: 'Available'
        }))
        
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ value: largeDataset })
        })
      })
      
      // When
      const startTime = Date.now()
      await productListPage.goto()
      const renderTime = Date.now() - startTime
      
      // Then
      expect(renderTime).toBeLessThan(5000) // 5 seconds max for large dataset
      await expect(page.locator('[data-testid="product-row"]')).toHaveCountGreaterThan(100)
    })
  })
})
```

---

## 📊 Performance & Load Testing

### k6 Performance Testing with Copilot

**🔹 Performance Testing Prompt:**
```
Generate comprehensive k6 performance tests for the SAP Product service covering:

1. Load Testing Scenarios:
   - Normal load (50 users, 5 minutes)
   - Peak load (200 users, 10 minutes)  
   - Stress test (500 users until failure)
   - Spike test (sudden load increase)

2. API Endpoints:
   - GET /products (list with filters)
   - GET /products/{id} (individual product)
   - POST /products (create)
   - PUT /products/{id} (update)
   - POST /products/{id}/restock (custom action)

3. Performance Metrics:
   - Response time (<200ms p95)
   - Throughput (>100 req/s)
   - Error rate (<1%)
   - Resource utilization

4. Realistic Scenarios:
   - Different user patterns
   - Various data payloads
   - Concurrent operations
   - Cache behavior validation

Include proper test data generation and result analysis.
```

**Generated k6 Performance Tests:**
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend } from 'k6/metrics'

// Custom metrics
export let errorRate = new Rate('errors')
export let productListTrend = new Trend('product_list_duration')
export let restockTrend = new Trend('restock_duration')

// Test configuration
export let options = {
  stages: [
    // Normal load test
    { duration: '2m', target: 10 },   // Ramp up
    { duration: '5m', target: 50 },   // Normal load
    { duration: '2m', target: 100 },  // Peak load
    { duration: '5m', target: 100 },  // Sustained peak
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests under 200ms
    http_req_failed: ['rate<0.01'],   // Error rate under 1%
    errors: ['rate<0.01'],
    product_list_duration: ['p(95)<150'],
    restock_duration: ['p(95)<300'],
  },
}

// Base URL from environment
const BASE_URL = __ENV.BASE_URL || 'http://localhost:4004'

// Test data
const testProducts = [
  { Name: 'Performance Test Widget A', Stock: 100, Category: 'Electronics' },
  { Name: 'Performance Test Widget B', Stock: 50, Category: 'Tools' },
  { Name: 'Performance Test Widget C', Stock: 25, Category: 'Books' }
]

export function setup() {
  // Create test products for the test
  const setupProducts = []
  
  for (let product of testProducts) {
    const response = http.post(
      `${BASE_URL}/odata/v4/InventoryService/Product`,
      JSON.stringify(product),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    
    if (response.status === 201) {
      setupProducts.push(JSON.parse(response.body))
    }
  }
  
  return { products: setupProducts }
}

export default function(data) {
  // User behavior simulation
  const userScenario = Math.random()
  
  if (userScenario < 0.6) {
    // 60% - Browse products
    browseProducts()
  } else if (userScenario < 0.8) {
    // 20% - View specific product
    viewProductDetails(data)
  } else if (userScenario < 0.95) {
    // 15% - Create new product
    createProduct()
  } else {
    // 5% - Restock existing product
    restockProduct(data)
  }
  
  sleep(Math.random() * 3 + 1) // 1-4 seconds think time
}

function browseProducts() {
  // Test product listing with various filters
  const filters = [
    '',
    '$filter=Stock gt 10',
    '$filter=Category eq \'Electronics\'',
    '$orderby=Name',
    '$orderby=Stock desc',
    '$top=10&$skip=0',
    '$select=ID,Name,Stock'
  ]
  
  const filter = filters[Math.floor(Math.random() * filters.length)]
  const url = `${BASE_URL}/odata/v4/InventoryService/Product?${filter}`
  
  const response = http.get(url)
  
  const success = check(response, {
    'product list status is 200': (r) => r.status === 200,
    'product list response time < 200ms': (r) => r.timings.duration < 200,
    'product list has data': (r) => {
      try {
        const data = JSON.parse(r.body)
        return data.value && Array.isArray(data.value)
      } catch {
        return false
      }
    }
  })
  
  productListTrend.add(response.timings.duration)
  errorRate.add(!success)
}

function viewProductDetails(data) {
  if (!data.products || data.products.length === 0) return
  
  const product = data.products[Math.floor(Math.random() * data.products.length)]
  const url = `${BASE_URL}/odata/v4/InventoryService/Product(${product.ID})`
  
  const response = http.get(url)
  
  const success = check(response, {
    'product detail status is 200': (r) => r.status === 200,
    'product detail response time < 150ms': (r) => r.timings.duration < 150,
    'product detail has correct ID': (r) => {
      try {
        const data = JSON.parse(r.body)
        return data.ID === product.ID
      } catch {
        return false
      }
    }
  })
  
  errorRate.add(!success)
}

function createProduct() {
  const newProduct = {
    Name: `Load Test Product ${Date.now()}`,
    Stock: Math.floor(Math.random() * 100) + 1,
    Category: ['Electronics', 'Tools', 'Books'][Math.floor(Math.random() * 3)]
  }
  
  const response = http.post(
    `${BASE_URL}/odata/v4/InventoryService/Product`,
    JSON.stringify(newProduct),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  
  const success = check(response, {
    'create product status is 201': (r) => r.status === 201,
    'create product response time < 300ms': (r) => r.timings.duration < 300,
    'create product returns ID': (r) => {
      try {
        const data = JSON.parse(r.body)
        return data.ID && data.Name === newProduct.Name
      } catch {
        return false
      }
    }
  })
  
  errorRate.add(!success)
}

function restockProduct(data) {
  if (!data.products || data.products.length === 0) return
  
  const product = data.products[Math.floor(Math.random() * data.products.length)]
  const restockAmount = Math.floor(Math.random() * 50) + 1
  
  const response = http.post(
    `${BASE_URL}/odata/v4/InventoryService/restock`,
    JSON.stringify({
      ID: product.ID,
      quantity: restockAmount,
      reason: 'Load test restock'
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  
  const success = check(response, {
    'restock status is 200': (r) => r.status === 200,
    'restock response time < 300ms': (r) => r.timings.duration < 300,
    'restock updates stock': (r) => {
      try {
        const data = JSON.parse(r.body)
        return data.Stock >= product.Stock + restockAmount
      } catch {
        return false
      }
    }
  })
  
  restockTrend.add(response.timings.duration)
  errorRate.add(!success)
}

export function teardown(data) {
  // Cleanup test products
  if (data.products) {
    for (let product of data.products) {
      http.del(`${BASE_URL}/odata/v4/InventoryService/Product(${product.ID})`)
    }
  }
}
```

---

## 🎯 Test Case Generation Summary

The enhanced workshop now provides comprehensive testing coverage with GitHub Copilot across the entire SAP stack:

### ✅ **Level 100 Testing Features:**
- **ABAP Unit Testing** - Traditional ABAP logic with modern test patterns
- **CAP Service Testing** - Node.js/TypeScript service validation  
- **Fiori Component Testing** - QUnit-based UI component tests
- **Integration Testing** - End-to-end OData API validation
- **Performance Testing** - k6-based load and stress testing

### ✅ **Level 200 Advanced Testing:**
- **Property-Based Testing** - Comprehensive edge case coverage
- **Chaos Engineering** - System resilience validation
- **Cross-Platform Testing** - Multi-browser and device testing
- **Accessibility Testing** - WCAG compliance validation
- **Security Testing** - Vulnerability and penetration testing

### ✅ **Copilot Testing Superpowers:**
- **Instant Test Generation** from minimal prompts
- **Realistic Test Data** creation for business scenarios
- **Edge Case Discovery** through AI suggestions
- **Test Maintenance** automation when code changes
- **Best Practice Application** across different tech stacks

This comprehensive testing approach ensures quality, performance, and reliability across the entire SAP modernization journey while leveraging GitHub Copilot's capabilities to accelerate development and improve test coverage.