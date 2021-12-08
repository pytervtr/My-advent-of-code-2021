defmodule Day02 do

  def main() do
    {:ok,commands} = {:ok,readFile("input")}

    IO.inspect(getSimpleCoordinatesResult(commands))
    IO.inspect(getAdvanceCoordinatesResult(commands))

  end

########################################################
#################   INPUT   ############################
########################################################

  def readFile(file_name) do

    {:ok, data} = File.read(file_name)
    data
    |> String.split("\n", trim: true)
    |> Enum.map(fn(x) ->  List.to_tuple((String.split(x))) end)
    |> Enum.map(fn(x) ->  {elem(x,0), String.to_integer(elem(x,1))} end)

  end

########################################################

########################################################
#################   PART 1   ###########################
########################################################

  def getSimpleCoordinatesResult(commands) do
    {:ok, final_coordinates} = {:ok, getSimpleNavigationCoordinates(commands)}
    Enum.at(final_coordinates,0)*Enum.at(final_coordinates,1)
  end

  def getSimpleNavigationCoordinates(commands) do

    #[vertical, horizontal]
    Enum.reduce(commands, [0,0], fn ({instruction, displacement}, coordinates) ->
      cond do
        instruction === "up" -> [Enum.at(coordinates,0)-displacement, Enum.at(coordinates,1)]
        instruction === "down" -> [Enum.at(coordinates,0)+displacement, Enum.at(coordinates,1)]
        instruction === "forward" -> [Enum.at(coordinates,0), Enum.at(coordinates,1)+displacement]
      end
    end)

  end

########################################################

########################################################
#################   PART 2   ###########################
########################################################

  def getAdvanceCoordinatesResult(commands) do
    {:ok, final_coordinates} = {:ok, getAdvanceNavigationCoordinates(commands)}
    Enum.at(final_coordinates,0)*Enum.at(final_coordinates,1)
  end

  def getAdvanceNavigationCoordinates(commands) do
    #[vertical, horizontal,aim]
    Enum.reduce(commands, [0,0,0], fn ({instruction, displacement}, coordinates) ->
      cond do
        instruction === "up" -> [Enum.at(coordinates,0), Enum.at(coordinates,1), Enum.at(coordinates,2)-displacement]
        instruction === "down" -> [Enum.at(coordinates,0), Enum.at(coordinates,1), Enum.at(coordinates,2)+displacement]
        instruction === "forward" -> [Enum.at(coordinates,0)+(Enum.at(coordinates,2)*displacement), Enum.at(coordinates,1)+displacement, Enum.at(coordinates,2)]
      end
    end)
  end

 ########################################################

end
Day02.main()
