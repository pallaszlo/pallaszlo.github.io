---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "3rem"

sections:
  # Home section with biography
  - block: resume-biography-3
    id: home
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
    design:
      css_class: ""
      background:
        color: white

  # Research section
  - block: markdown
    id: research
    content:
      title: Research Interests
      text: |
        Dr. Pál László specializes in global optimization algorithms and stochastic search methods. His research focuses on:

        - **Global Optimization**: Developing algorithms that find global optima in complex solution spaces
        - **GLOBAL Method**: A multistart algorithm combining local and global search strategies
        - **UNIRANDI Algorithm**: Stochastic local search technique using random direction exploration
        - **Algorithm Benchmarking**: Evaluating performance of optimization methods on test functions
        - **Multistart Methods**: Techniques that efficiently explore multiple starting points
        - **Black-box Optimization**: Methods for problems where function structure is unknown
    design:
      columns: '1'

  # Publications section
  - block: collection
    id: publications
    content:
      title: Publications
      text: |
        Selected publications in global optimization, algorithm analysis, and computational mathematics.
      filters:
        folders:
          - publication
    design:
      columns: '1'
      view: citation

  # Teaching section
  - block: markdown
    id: teaching
    content:
      title: Teaching
      text: |
        **Current Courses:**

        - **Optimization Methods** - Advanced algorithms for solving optimization problems, including local and global search techniques
        - **Numerical Analysis** - Computational methods for mathematical problems and algorithm implementation
        - **Algorithm Design and Analysis** - Theoretical foundations and practical implementation of algorithms

        Dr. Pál László is committed to educating the next generation of computer scientists and mathematicians in optimization theory and computational methods.
    design:
      columns: '1'

  # Contact section
  - block: markdown
    id: contact
    content:
      title: Contact
      text: |
        **Dr. Pál László**
        Associate Professor
        Department of Informatics
        University of Szeged

        📧 Email: pal.laszlo@inf.u-szeged.hu
        🏢 Office: Department of Informatics
        🌐 University: https://www.inf.u-szeged.hu/

        Feel free to reach out for collaboration opportunities, research discussions, or academic inquiries.
    design:
      columns: '1'
---
