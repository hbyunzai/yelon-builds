export class AnalysisAddon {
    static putValueInAnalysis(values) {
        if (!window)
            return;
        // @ts-ignore
        if (!window['yunzai'])
            return;
        // @ts-ignore
        if (window['yunzai']['extra']) {
            // @ts-ignore
            window['yunzai']['extra'] = { ...window['yunzai']['extra'], ...values };
        }
        else {
            // @ts-ignore
            window['yunzai']['extra'] = { ...values };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzaXMuYWRkb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iaXMvbGF5b3V0L2FuYWx5c2lzLmFkZG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUF3QjtRQUNoRCxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU07UUFDbkIsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTTtRQUM3QixhQUFhO1FBQ2IsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsYUFBYTtZQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFDLENBQUE7U0FDdEU7YUFBSTtZQUNILGFBQWE7WUFDYixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLE1BQU0sRUFBQyxDQUFBO1NBQ3hDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFuYWx5c2lzQWRkb24ge1xuICBzdGF0aWMgcHV0VmFsdWVJbkFuYWx5c2lzKHZhbHVlczogUmVjb3JkPGFueSwgYW55Pikge1xuICAgIGlmICghd2luZG93KSByZXR1cm5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKCF3aW5kb3dbJ3l1bnphaSddKSByZXR1cm5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHdpbmRvd1sneXVuemFpJ11bJ2V4dHJhJ10pIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHdpbmRvd1sneXVuemFpJ11bJ2V4dHJhJ10gPSB7Li4ud2luZG93Wyd5dW56YWknXVsnZXh0cmEnXSwgLi4udmFsdWVzfVxuICAgIH1lbHNle1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgd2luZG93Wyd5dW56YWknXVsnZXh0cmEnXSA9IHsuLi52YWx1ZXN9XG4gICAgfVxuICB9XG59XG4iXX0=