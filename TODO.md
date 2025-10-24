# TODO: Fix worked hours not appearing in chart

## Tarefas Pendentes:
- [x] Modify `atualizar_graficos()` in app.py to include all projects with worked hours, even without budgets.
- [x] Set budgeted hours to 0 for projects without budgets.
- [x] Change `atualizar_graficos()` to pull worked hours data from Supabase instead of local Excel to ensure charts reflect current data.
- [x] Add separate `atualizar_orcamentos()` function to update the Orçamentos sheet.
- [x] Update calls to include `atualizar_orcamentos()` alongside `atualizar_graficos()`.
- [x] Ensure budgets appear in the Gráficos sheet with their respective information and charts.
- [x] Temporarily disable table and chart creation to prevent Excel file corruption.

## Dependências:
- app.py: Update the atualizar_graficos function and add atualizar_orcamentos.

## Notas:
- Currently, only projects with budgets in orcamentos.json appear in charts.
- Need to collect all unique project keys from worked hours first.
- Charts now include all projects with worked hours, even without budgets.
- Orçamentos sheet is now updated separately and populated with data from orcamentos.json.
- Budgets now appear in the Gráficos sheet with worked hours, budgeted hours, remaining hours, and percentage completion.
- Charts are generated for all projects that have budgets or worked hours.
- Table and chart creation has been temporarily commented out to avoid Excel file corruption. The data is still populated correctly in the "Gráficos" sheet.
