puts "Criando usuário de demonstração..."

user = User.find_or_create_by!(email: "demo@taskforge.app") do |u|
  u.name = "Demo Mutant"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.subscription_type = :mutant
end

puts "Usuário criado: #{user.email} / senha: 123456"

if user.boards.count.zero?
  board = user.boards.create!(title: "Meu Projeto Principal", color: "#e31c25")

  list_todo = board.lists.create!(title: "A Fazer", position: 0)
  list_doing = board.lists.create!(title: "Em Progresso", position: 1)
  list_done = board.lists.create!(title: "Concluído", position: 2)

  card1 = list_todo.cards.create!(title: "Definir arquitetura do sistema", priority: :high, due_date: 3.days.from_now)
  card1.checklist_items.create!([
    { title: "Escolher stack", completed: true, position: 0 },
    { title: "Desenhar models", completed: false, position: 1 },
    { title: "Definir endpoints", completed: false, position: 2 }
  ])

  list_todo.cards.create!(title: "Criar design system", priority: :medium, description: "Cores, tipografia e componentes")
  list_doing.cards.create!(title: "Implementar autenticação JWT", priority: :urgent, due_date: Date.today)
  list_done.cards.create!(title: "Setup inicial do repositório", priority: :low, completed: true)
end

puts "Seeds finalizados!"
puts "Login: demo@taskforge.app / 123456 (plano Mutant)"
