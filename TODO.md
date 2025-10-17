# TODO: Adicionar funcionalidade de exportar dados do Supabase para Excel na página Admin

## Tarefas Pendentes:
- [x] Adicionar rota `/admin/export_to_excel` no app.py para buscar dados do Supabase e atualizar o Excel com eles.
- [x] Adicionar rota `/admin/download_excel` no app.py para permitir o download do arquivo Excel.
- [x] Atualizar templates/admin.html para incluir uma seção "Exportar Dados para Excel" com botões para exportar e baixar.
- [ ] Testar a funcionalidade de exportar e baixar o Excel.

## Dependências:
- app.py: Adicionar novas rotas.
- templates/admin.html: Adicionar seção de exportar.

## Notas:
- A exportação deve transferir os dados do Supabase para o Excel, permitindo ao admin adicionar horas e analisar gráficos.
- O sistema roda em tablet, mas o admin visualiza em computador.
