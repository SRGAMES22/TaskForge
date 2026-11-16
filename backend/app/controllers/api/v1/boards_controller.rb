module Api
  module V1
    class BoardsController < ApplicationController
      def index
        boards = current_user.boards.order(created_at: :desc)
        render json: boards
      end

      def show
        board = current_user.boards.includes(lists: { cards: :checklist_items }).find(params[:id])

        render json: {
          id: board.id,
          title: board.title,
          color: board.color,
          lists: board.lists.map { |list|
            {
              id: list.id,
              title: list.title,
              position: list.position,
              cards: list.cards.map { |card| card_response(card) }
            }
          }
        }
      end

      def create
        board = current_user.boards.build(board_params)

        if board.save
          # Cria listas padrão
          ["A Fazer", "Em Progresso", "Concluído"].each_with_index do |title, index|
            board.lists.create!(title: title, position: index)
          end

          render json: board, status: :created
        else
          render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        board = current_user.boards.find(params[:id])

        if board.update(board_params)
          render json: board
        else
          render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        board = current_user.boards.find(params[:id])
        board.destroy
        head :no_content
      end

      private

      def board_params
        params.permit(:title, :color)
      end

      def card_response(card)
        {
          id: card.id,
          title: card.title,
          description: card.description,
          position: card.position,
          priority: card.priority,
          due_date: card.due_date,
          completed: card.completed,
          checklist_items: card.checklist_items.map { |item|
            { id: item.id, title: item.title, completed: item.completed, position: item.position }
          }
        }
      end
    end
  end
end
