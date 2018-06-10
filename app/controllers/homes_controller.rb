class HomesController < ApplicationController

	def index

	end

	def get_contacts
		if params[:str].present?
			data = {}
			params[:str].split('').each do |c|
				data[c] = User.select(:id,:name,:mobile).where('lower(name) LIKE ?',"#{c}%").order(name: :asc)
			end
			render json:{
				contact:data
			}
		end
	end
end
