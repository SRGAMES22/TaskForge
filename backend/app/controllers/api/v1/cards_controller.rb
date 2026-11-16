module Api
  module V1
    class CardsController < ApplicationController
      def create
        list = List.joins(:board).where(boards: { user_id: current_user.id }).find(params[:list_id])
        card = list.cards.build(card_params)
        card.position = list.cards.count

        if card.save
          render json: card_response(card), status: :created
        else
          render json: { errors: card.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        card = Card.joins(list: :board).where(boards: { user_id: current_user.id }).find(params[:id])
        render json: card_response(card)
      end

      def update
        card = Card.joins(list: :board).where(boards: { user_id: current_user.id }).find(params[:id])

        if card.update(card_params)
          render json: card_response(card)
        else
          render json: { errors: card.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        card = Card.joins(list: :board).where(boards: { user_id: current_user.id }).find(params[:id])
        card.destroy
        head :no_content
      end

      def move
        card = Card.joins(list: :board).where(boards: { user_id: current_user.id }).find(params[:id])
        new_list = List.joins(:board).where(boards: { user_id: current_user.id }).find(params[:list_id])

        card.update(list: new_list, position: params[:position] || new_list.cards.count)
        render json: card_response(card)
      end

      private

      def card_params
        params.permit(:title, :description, :priority, :due_date, :completed, :position)
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
          list_id: card.list_id,
          checklist_items: card.checklist_items.map { |item|
            { id: item.id, title: item.title, completed: item.completed, position: item.position }
          }
        }
      end
    end
  end
end
