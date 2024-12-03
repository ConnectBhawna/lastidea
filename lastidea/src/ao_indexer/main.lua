
_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_TOKEN = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

BASE_URL = "https://api.weavescan.dev/api/content/items/projects"
FEE_AMOUNT = "1000000000000" -- 1 $0RBT

-- 

Handlers.add(
	"Get-Request",
	Handlers.utils.hasMatchingTag("Action", "First-Get-Request"),
	function(msg)
		Send({
			Target = _0RBT_TOKEN,
			Action = "Transfer",
			Recipient = _0RBIT,
			Quantity = FEE_AMOUNT,
			["X-Url"] = BASE_URL,
			["X-Action"] = "Get-Real-Data"
		})
		print(Colors.green .. "You have sent a GET Request to the 0rbit process.")
	end
)


local json = require("json")

Handlers.add(
	"ReceiveData",
	Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
	function(msg)
		local res = json.decode(msg.Data)
		ReceivedData = res
		print(Colors.green .. "You have received the data from the 0rbit process.")
	end
)

-- 

ReceivedData = ReceivedData or {}

-- 

Send({Target="BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc", Action="Balance"})

-- {
--     receive = function: 0x65dd460,
--     onReply = function: 0x65dd360,
--     output = "Message added to outbox"
--  }

-- 

Inbox[#Inbox].Data

-- 

Send({ Target= ao.id, Action="First-Get-Request" })

-- 

ReceivedData

-- 

local data = ReceivedData
-- Function to filter projects based on a query
 function filterProjects(query, projects)
  local keywords = {}
  for word in string.gmatch(query, "%S+") do
    table.insert(keywords, word:lower())
  end
  
   function matches(project)
    for _, keyword in ipairs(keywords) do
      local found = false
      -- Check if keyword matches any relevant field in the project
      if project.title and project.title:lower():find(keyword) then found = true end
      if project.description and project.description:lower():find(keyword) then found = true end
      if project.link and project.link:lower():find(keyword) then found = true end
      if project.tags then
        for _, tag in ipairs(project.tags) do
          if tag:lower():find(keyword) then found = true end
        end
      end
      if found == false then return false end
    end
    return true
  end

  -- Filter the projects
   result = {}
  for _, project in ipairs(projects) do
    if matches(project) then
      table.insert(result, project)
    end
  end
  return result
end

--

json = require('json')
	
Handlers.add("Last.Last", Handlers.utils.hasMatchingTag("Action", "Query"),function(msg)
 local filteredProjects = filterProjects(msg.Data , ReceivedData)

for _, project in ipairs(filteredProjects) do
  print(project.title)
  print(project.description)
  print(project.link)
end

msg.reply({Data=json.encode(filteredProjects) , Action="Last.Reply"})

end)

-- Indexing handler

Handlers.add("Index", Handlers.utils.hasMatchingTag("Action", "Index"), function(msg)
  local newProject = json.decode(msg.Data)
  
  -- Validate new project structure
  if not newProject.title or not newProject.description then
      msg.reply({
          Action = "Index.Error",
          Data = "Invalid project structure"
      })
      return
  end
  
  -- Add new project to ReceivedData
  table.insert(ReceivedData, newProject)
  
  msg.reply({
      Action = "Index.Success",
      Data = "Project added successfully"
  })
end)


function paginateResults(projects, page, pageSize)
  page = page or 1
  pageSize = pageSize or 10
  
  local startIndex = (page - 1) * pageSize + 1
  local endIndex = math.min(startIndex + pageSize - 1, #projects)
  
  local pagedResults = {}
  for i = startIndex, endIndex do
      table.insert(pagedResults, projects[i])
  end
  
  return {
      projects = pagedResults,
      total = #projects,
      page = page,
      pageSize = pageSize
  }
end

-- Modify query handler to support pagination
Handlers.add("Last.Last", Handlers.utils.hasMatchingTag("Action", "Query"), function(msg)
  local page = tonumber(msg.Page) or 1
  local pageSize = tonumber(msg.PageSize) or 10
  
  local filteredProjects = filterProjects(msg.Data, ReceivedData)
  local paginatedResults = paginateResults(filteredProjects, page, pageSize)
  
  msg.reply({
      Data = json.encode(paginatedResults),
      Action = "Last.Reply"
  })
end)