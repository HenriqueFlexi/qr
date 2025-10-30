# TODO: Add filtering to Excel spreadsheet registros.xlsx

## Tarefas Pendentes:
- [ ] Modify `criar_planilha_se_nao_existir()` in app.py to add auto filters to "Registros" and "Gráficos" sheets.
- [ ] Ensure `atualizar_graficos()` sets auto filter on "Gráficos" sheet if it exists.

## Dependências:
- app.py: Update the functions to enable auto filters.

## Notas:
- Auto filters will allow manual filtering in Excel by project, name, etc. in Registros tab.
- In Gráficos tab, filtering data will affect visible rows; charts are static but can be made dynamic in Excel.
