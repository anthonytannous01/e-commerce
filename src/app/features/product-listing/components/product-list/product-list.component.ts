import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community'
import { map } from 'rxjs/operators'
import { ProductService } from '../../../services/product.service'
import { iProduct } from '../../../../shared/models/product.model'
import { SearchService } from '../../../services/search.service'
import { SortService } from '../../../services/sort.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  Firstname: string | null = ''
  products$!: Observable<iProduct[]>
  filteredProducts$!: Observable<iProduct[]>
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  sortOption$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  selectedFilters: { [key: string]: string[] } = {
    fabric: [],
    gender: [],
    color: [],
    style: [],
    type: [],
  }
  filtersSubject: BehaviorSubject<{ [key: string]: string[] }> =
    new BehaviorSubject(this.selectedFilters)
  @Output() sortOptionChanged = new EventEmitter<string>()
  private gridApis: { [key: string]: GridApi } = {}
  public themeClass: string = 'ag-theme-quartz'
  public rowSelection: 'multiple' | 'single' = 'multiple'

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private sortService: SortService
  ) {}

  fabricRowData = [
    { fabric: 'Cotton' },
    { fabric: 'Polyester' },
    { fabric: 'Leather' },
    { fabric: 'Fleece' },
    { fabric: 'Polyurethane' },
    { fabric: 'Rayon' },
    { fabric: 'Spandex' },
  ]

  genderRowData = [{ gender: 'Men' }, { gender: 'Women' }]
  colorRowData = [
    { color: 'Gold' },
    { color: 'Silver' },
    { color: 'Rose Gold' },
  ]
  styleRowData = [
    { style: 'Slim Fit' },
    { style: 'Casual' },
    { style: 'V-Neck' },
  ]
  typeRowData = [{ type: 'Long Sleeve' }, { type: 'Short Sleeve' }]

  public fabricColDefs: ColDef[] = [
    {
      field: 'fabric',
      headerName: 'Fabric',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: true,
    },
  ]

  public genderColDefs: ColDef[] = [
    {
      field: 'gender',
      headerName: 'Gender',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: true,
    },
  ]

  public colorColDefs: ColDef[] = [
    {
      field: 'color',
      headerName: 'Color',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: true,
    },
  ]

  public styleColDefs: ColDef[] = [
    {
      field: 'style',
      headerName: 'Style',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: true,
    },
  ]

  public typeColDefs: ColDef[] = [
    {
      field: 'type',
      headerName: 'Type',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: true,
    },
  ]

  sort(option: string) {
    this.sortOption$.next(option)
  }

  ngOnInit() {
    this.Firstname = localStorage.getItem('Firstname')
    this.products$ = this.productService.getAllProducts()
    this.searchService.searchQuery$.subscribe((query) => {
      this.searchQuery$.next(query)
    })
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchQuery$,
      this.filtersSubject,
      this.sortOption$,
    ]).pipe(
      map(([products, searchQuery, selectedFilters, sortOption]) => {
        const filtered = products.filter((product) => {
          const title = product.title.toLowerCase()
          const description = product.description.toLowerCase()
          const category = product.category.toLowerCase()
          const search = searchQuery.toLowerCase()

          const matchesSearch = search
            ? title.includes(search) ||
              description.includes(search) ||
              category.includes(search)
            : true

          const matchesFabric = selectedFilters['fabric'].length
            ? selectedFilters['fabric'].some((filter) =>
                this.checkMatch(filter, title, description, category)
              )
            : true

          const matchesGender = selectedFilters['gender'].length
            ? selectedFilters['gender'].some((filter) =>
                this.checkMatch(filter, title, description, category)
              )
            : true

          const matchesColor = selectedFilters['color'].length
            ? selectedFilters['color'].some((filter) =>
                this.checkMatch(filter, title, description, category)
              )
            : true

          const matchesStyle = selectedFilters['style'].length
            ? selectedFilters['style'].some((filter) =>
                this.checkMatch(filter, title, description, category)
              )
            : true

          const matchesType = selectedFilters['type'].length
            ? selectedFilters['type'].some((filter) =>
                this.checkMatch(filter, title, description, category)
              )
            : true

          return (
            matchesSearch &&
            matchesFabric &&
            matchesGender &&
            matchesColor &&
            matchesStyle &&
            matchesType
          )
        })
        return this.sortService.sort(filtered, sortOption)
      })
    )
  }

  onGridReady(params: GridReadyEvent, gridId: string) {
    this.gridApis[gridId] = params.api
    params.api.sizeColumnsToFit()
  }

  onFilterChange(filterType: string, selectedValues: string[]) {
    this.selectedFilters[filterType] = selectedValues
    this.filtersSubject.next(this.selectedFilters)
  }

  getSelectedValues(gridId: string, filterType: string): string[] {
    const gridApi = this.gridApis[gridId]
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes()
      return selectedNodes.map((node) => node.data[filterType])
    }
    return []
  }

  private checkMatch(
    filter: string,
    title: string,
    description: string,
    category: string
  ): boolean {
    const regex = new RegExp(`\\b${filter.toLowerCase()}\\b`, 'i')
    const matchInTitle = regex.test(title.toLowerCase())
    const matchInDescription = regex.test(description.toLowerCase())
    const matchInCategory = regex.test(category.toLowerCase())
    return matchInTitle || matchInDescription || matchInCategory
  }
}
