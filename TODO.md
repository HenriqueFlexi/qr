# TODO: Fix worked hours not appearing in chart

## Tarefas Pendentes:
- [x] Modify `atualizar_graficos()` in app.py to include all projects with worked hours, even without budgets.
- [x] Set budgeted hours to 0 for projects without budgets.
- [x] Change `atualizar_graficos()` to pull worked hours data from Supabase instead of local Excel to ensure charts reflect current data.
- [ ] Test chart generation to ensure worked hours appear.

## Dependências:
- app.py: Update the atualizar_graficos function.

## Notas:
- Currently, only projects with budgets in orcamentos.json appear in charts.
- Need to collect all unique project keys from worked hours first.
