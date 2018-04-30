document.getElementById('searchName').addEventListener('submit', searchName);
            function searchName(e){
                e.preventDefault();
                let zapr = document.getElementById('sea').value;
                fetch('https://api.github.com/users/'+zapr)
                        .then((res) => res.json())
                        .then((data) => {
                            var element  = document.getElementById('output');
                            document.getElementById('output').innerHTML = '';
                            var fragment = document.createDocumentFragment();
                            if(data.message){
                                var section = document.createElement('section');
                                section.setAttribute('class', 'error');
                                var dot = document.createElement('span');
                                dot.textContent = '*';
                                dot.setAttribute('class', 'log');
                                section.appendChild(dot);
                                var span1 = document.createElement('span');
                                span1.textContent = 'User: ';
                                section.appendChild(span1);
                                var user = document.createElement('span');
                                user.textContent = zapr;
                                user.setAttribute('class', 'log');
                                section.appendChild(user);
                                var span2 = document.createElement('span');
                                span2.textContent = ' is not found.';
                                section.appendChild(span2);
                                fragment.appendChild(section);
                            }
                            else{
                                let pyst = 'No information';
                                if(data.bio===null) data.bio = pyst;
                                if(data.company===null) data.company = pyst;
                                if(data.location===null) data.location = pyst;
                                if(data.email===null) data.email = pyst;
                                if(data.blog===null) data.blog = pyst;
                                
                                var main = document.createElement('main');
                                var img = document.createElement('img');
                                img.setAttribute('src' , data.avatar_url);
                                img.setAttribute('height' , 300);
                                img.setAttribute('width' , 300);
                                main.appendChild(img);
                                var hh = document.createElement('h2');
                                hh.innerText = data.name;
                                main.appendChild(hh);
                                var p = document.createElement('p');
                                p.innerText = data.bio;
                                main.appendChild(p);
                                var hr = document.createElement('hr');
                                main.appendChild(hr);
                                var section = document.createElement('section');
                                var div1 = document.createElement('div');
                                div1.textContent = data.company;
                                div1.setAttribute('class', 'company');
                                section.appendChild(div1);
                                var div2 = document.createElement('div');
                                div2.textContent = data.location;
                                div2.setAttribute('class', 'location');
                                section.appendChild(div2);
                                main.appendChild(section);
                                var a1 = document.createElement('a');
                                a1.textContent = data.email;
                                a1.setAttribute('class', 'mail');
                                a1.setAttribute('href', data.email);
                                section.appendChild(a1);
                                var a2 = document.createElement('a');
                                a2.textContent = data.blog;
                                a2.setAttribute('class', 'blog');
                                a2.setAttribute('href', data.blog);
                                section.appendChild(a2);
                                fragment.appendChild(main);                
                            }
                            element.appendChild(fragment);
                        })  
            }