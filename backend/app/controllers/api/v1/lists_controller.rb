module Api
  module V1
    class ListsController < ApplicationController
      before_action :set_board

      def index
        render json: @board.lists
      end

      def create
        list = @board.lists.build(list_params)
        list.position = @board.lists.count

        if list.save
          render json: list, status: :created
        else
          render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        list = @board.lists.find(params[:id])

        if list.update(list_params)
          render json: list
        else
          render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        list = @board.lists.find(params[:id])
        list.destroy
        head :no_content
      end

      private

      def set_board
        @board = current_user.boards.find(params[:board_id])
      end

      def list_params
        params.permit(:title, :position)
      end
    end
  end
end
