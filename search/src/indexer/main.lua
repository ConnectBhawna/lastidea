
_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_TOKEN = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

BASE_URL = "https://api.weavescan.dev/api/content/items/projects"
FEE_AMOUNT = "1000000000000" -- 1 $0RBT


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


ReceivedData = ReceivedData or {}


Send({Target="BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc", Action="Balance"})


Inbox[#Inbox].Data

Send({ Target= ao.id, Action="First-Get-Request" })

ReceivedData

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
            
            -- Convert entire project to lowercase string for comprehensive search
            local projectString = json.encode(project):lower()
            
            -- Explicit checks for key fields
            if project.title and project.title:lower():find(keyword) then found = true end
            if project.description and project.description:lower():find(keyword) then found = true end
            if project.link and project.link:lower():find(keyword) then found = true end
            
            -- Check tags
            if project.tags then
                for _, tag in ipairs(project.tags) do
                    if tag:lower():find(keyword) then
                        found = true
                        break
                    end
                end
            end
            
            -- Fallback to full project string search
            if not found and projectString:find(keyword) then
                found = true
            end
            
            if not found then return false end
        end
        return true
    end
    
    -- Filter the projects
    local result = {}
    for _, project in ipairs(projects) do
        if matches(project) then
            table.insert(result, project)
        end
    end
    
    return result
end

json = require('json')
	
Handlers.add("Last.Last", Handlers.utils.hasMatchingTag("Action", "Query"), function(msg)
    local filteredProjects = filterProjects(msg.Data, ReceivedData)

    msg.reply({
        Data = json.encode(filteredProjects),
        Action = "Last.Reply"
    })
end)


json = require('json')
Handlers.add("Index", Handlers.utils.hasMatchingTag("Action", "Index"), function(msg)
    -- Parse the incoming project data
    local success, newProject = pcall(json.decode, msg.Data)
    
    -- Check if JSON parsing was successful
    if not success then
        msg.reply({
            Action = "Index.Error",
            Data = json.encode({
                error = "Invalid JSON format",
                status = "failed"
            })
        })
        return
    end
    
    -- Basic validation to ensure title exists
    if not newProject.title or newProject.title == "" then
        msg.reply({
            Action = "Index.Error",
            Data = json.encode({
                error = "Project title is required",
                status = "failed"
            })
        })
        return
    end
    
    -- Ensure all expected fields are present
    local projectToStore = {
        title = newProject.title,
        slug = newProject.slug or "",
        description = newProject.description or "",
        link = newProject.link or "",
        twitter = newProject.twitter or "",
        discord = newProject.discord or "",
        telegram = newProject.telegram or "",
        tags = newProject.tags or {}
    }
    
    -- Add to ReceivedData
    table.insert(ReceivedData, projectToStore)
    
    -- Respond with success
    msg.reply({
        Action = "Index.Success",
        Data = json.encode({
            message = "Project added successfully",
            project = projectToStore,
            status = "success"
        })
    })
end)

Send({
    Target = ao.id,
    Action = "Index",
    Data = json.encode({
        title = "Ankush Kun",
        slug = "Betteridea",
        description = "Entrepreneur In Residence @ Forward Research (Arweave). Community Manager @ ArweaveIndia. Founder of BetterIDEa",
        link = "https://ankush.one",
        twitter = "https://x.com/ankushkun_",
        tags = {"Betteridea", "Founder", "Community Manager"}
    })
})