import requests
from bs4 import BeautifulSoup, Comment
from urllib.parse import urljoin, urlparse
from collections import deque

def get_visible_text(soup):
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    return u" ".join(t.strip() for t in visible_texts)

def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True

def is_valid_url(url, base_url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and parsed.netloc == urlparse(base_url).netloc

def crawl(url, output_file):
    visited = set()
    queue = deque([url])
    base_url = url

    with open(output_file, 'w', encoding='utf-8') as f:
        while queue:
            current_url = queue.popleft()
            if current_url in visited:
                continue

            visited.add(current_url)
            response = requests.get(current_url)

            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                visible_text = get_visible_text(soup)
                f.write(f"URL: {current_url}\nText: {visible_text}\n\n")

                for link in soup.find_all('a', href=True):
                    next_url = urljoin(base_url, link['href'])
                    if is_valid_url(next_url, base_url) and next_url not in visited:
                        queue.append(next_url)
            else:
                print(f"Failed to retrieve the page. Status code: {response.status_code}")

start_url = 'https://cookbook_ao.g8way.io/welcome/index.html'
output_file = 'output.txt'
crawl(start_url, output_file)