defmodule Day01 do

	def day01() do

			data = readFile("input")

			IO.puts inspect(getIncreasingContinuosValues(data,1))
			IO.puts inspect(getSumIncreasingValues(data))
			#[199,200,208,210,200,207,240,269,260,263]

	end

########################################################
#################   INPUT   ############################
########################################################

	def readFile(name) do

			{:ok, data}=File.read(name)
			data
			|> String.split("\n", trim: true)
			|> Enum.map(&String.to_integer/1)

	end

########################################################

########################################################
#################   PART 1   ###########################
########################################################

	def getIncreasingContinuosValues(list,next_ones) do

		{:ok, resultado} = {:ok, Enum.filter(next_ones..length(list)-1, fn(x) -> isIncreasing(Enum.slice(list, x-next_ones, next_ones+1), next_ones) end)}
		length(resultado)
	end

	def isIncreasing(sub_list, next_ones) do
		{:ok, resultado} = {:ok, Enum.filter(next_ones..length(sub_list)-1, fn(x) -> Enum.at(sub_list, x) > Enum.at(sub_list,x-1) end)}
		length(resultado) === (next_ones)
	end


########################################################

########################################################
#################   PART 2   ###########################
########################################################

	def getSumIncreasingValues(list) do

		{:ok, new_list} = {:ok, sumGroupElements(list,3)}
		getIncreasingContinuosValues(new_list, 1)
	end

	def sumGroupElements(list, group_size) do
		Enum.map(0..length(list)-group_size, fn(x) -> Enum.at(list,x)+Enum.at(list,x+1)+Enum.at(list,x+2) end)
	end

########################################################

end


Day01.day01()
