
# Senior Web Developer Task

## Overview

This project is a Single Page Application (SPA) designed to display and analyze test results of trainees. The application provides functionality to filter and visualize trainee data through various charts and grids. The application is built using Angular and Angular Material, with a focus on usability, state management, and responsive design.

## Features

1. **State Management**: The application saves the state of each page, ensuring that filters and other settings persist without refreshing the screen.
2. **Dynamic Filtering**: Pages with filters show all results by default and activate filters only when the user inputs values.
3. **Responsive Design**: The application is designed to work on various screen sizes using Angular Material for a consistent look and feel.
4. **Drag and Drop Functionality**: Charts on the Analysis Page can be rearranged using drag-and-drop.

## Pages and Functionality

### Data Page

![dataPage](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/f6fe1a53-9a01-45a4-918b-e549e9d73139)


- **Filter**: Filters the grid according to the text in the input box. The input can accept keywords like `ID:` to filter by the ID column and `>` or `<` for filtering grades and dates in a certain range.
  
  ![filterDate](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/5493d6a9-fbb1-439d-8c57-f1e6f3b94419)

- **Grid**: Displays data in a table. Selecting a row opens the details in the details panel.
- **Details Panel**: Shows and allows editing of trainee data, which can be saved using the buttons above the panel.
  <br>
  ![detailes](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/6c414a27-7598-4848-9114-c39beb86b59d)

- **Add/Remove Trainee**: Buttons to add a new trainee or remove the selected trainee.
  ![addTrainee](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/143039a3-6215-4d83-b26a-79c8169bfc56)


### Analysis Page
![AnalysisPage](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/a82ef69a-a5c5-43d1-ac8f-4fda6821f4af)

- **ID Filter**: Multiselect to select which trainee IDs to present in the charts.
- **Subject Filter**: Multiselect to select which subjects to present in the chart.
- **Charts**: Shows up to two charts at a time, with drag-and-drop functionality to rearrange them.
  ![drag](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/4834f36b-363b-4cd2-8137-05684b062729)


### Monitor Page

![monitorPage](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/fb9d953f-6e55-468c-b93c-3dee7e51bcce)


- **Filters**: Allows filtering results according to IDs, names, and state (passed or failed).
- **Grid**: Displays the filtered data, marking trainees as passed or failed based on their average score.
  ![filterMonitor](https://github.com/ruthk730/trainee-management-ruth-task/assets/116270058/de57b2e6-0231-4fff-a054-46e329625475)

## Post Scriptum

Since the assignment was specific to Angular, I created local data within the application itself.

To view the data I created, run the following command in the terminal:

```bash
json-server --watch src/assets/data/trainee-data.json
